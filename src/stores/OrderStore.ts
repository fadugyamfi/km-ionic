import { defineStore } from "pinia";
import AppStorage from "./AppStorage";
import { Order, OrderStatus } from "@/models/Order";
import { useToastStore } from "./ToastStore";
import axios from "axios";
import { useUserStore } from "./UserStore";
import { ChangeStatusRequest } from "../models/types";
import Product from "@/models/Product";
import { OrderItem } from "@/models/OrderItem";
import { v4 as uuidv4 } from "uuid";
import Business from "@/models/Business";
import { useGeolocation } from "../composables/useGeolocation";
import {
  formatDateMySQL,
  formatMySQLDateTime,
  handleAxiosRequestError,
} from "../utilities";
import { useAppStore } from "./AppStore";

const storage = new AppStorage();
const KOLA_EDITED_ORDER = "kola.edited-order";
const KOLA_SALE_AGENT_ORDER = "kola.sale-agent-order";
const KOLA_AGENT_SELECTED_CUSTOMER = "kola.agent-order-selected-customer";
const KOLA_RECORDED_ORDERS = "kola.recorded-orders";

export const useOrderStore = defineStore("order", {
  state: () => {
    return {
      orders: [] as Order[],
      newOrder: new Order({}),
      selectedCustomer: null as Business | null,
      editedOrder: {} as Order,
      editing: false,
      approving: false,
      cancelling: false,
      changingStatus: false,
      selectedOrder: null as Order | null,
      recordedOrders: [] as Order[],
      orderSyncTimer: null as any,
    };
  },

  actions: {
    async loadFromStorage() {
      let data = await storage.get(KOLA_EDITED_ORDER);
      let newOrderData = await storage.get(KOLA_SALE_AGENT_ORDER);
      let selectedCustomerData = await storage.get(
        KOLA_AGENT_SELECTED_CUSTOMER
      );
console.log(newOrderData)
      Object.assign(this.editedOrder, data);
      Object.assign(this.newOrder, newOrderData);
      Object.assign({}, this.selectedCustomer, selectedCustomerData);
    },

    async loadCachedRecordedOrders() {
      if (this.recordedOrders.length > 0) {
        return;
      }

      const userStore = useUserStore();
      const CACHE_KEY = `${KOLA_RECORDED_ORDERS}.${userStore.activeBusiness?.id}`;

      const records = await storage.get(CACHE_KEY);

      if (records) {
        this.recordedOrders = records.map(
          (record: object) => new Order(record)
        ) as Order[];
      }

      this.startOrderDataSync();
    },
    async startOrderDataSync() {
      if (this.orderSyncTimer != null) {
        return;
      }

      console.log("Starting order data sync");

      const appStore = useAppStore();

      this.orderSyncTimer = setInterval(async () => {
        if (this.recordedOrders.length == 0 || !appStore.networkConnected) {
          return;
        }

        const order = this.recordedOrders.shift() as Order;

        try {
          const synced = await this.recordOrderOnline(order);
          if (synced) {
            this.persistRecordedOrders(); // save new cache without synced sale
          } else {
            this.recordedOrders.push(order);
          }
        } catch (error: any) {
          if (!error.message.includes("duplicate")) {
            this.recordedOrders.push(order);
          } else {
            this.persistRecordedOrders();
          }
        }
      }, 1000 * 15);
    },
    async recordOrderOnline(order: Order): Promise<Order | null> {
      const payload = Object.assign({}, order, {
        order_items: order._order_items,
      });

      return axios
        .post("/v2/orders", payload)
        .then((response) => {
          const savedOrder = new Order(response.data.data);
          const unsyncedIndex = this.orders.findIndex(
            (o: Order) => o.uuid == order.uuid
          );

          if (unsyncedIndex > -1) {
            this.orders[unsyncedIndex] = order;
          } else {
            this.orders.unshift(savedOrder);
          }

          return savedOrder;
        })
        .catch((error) => {
          handleAxiosRequestError(error);

          throw new Error(error.response.data.api_message);
        });
    },
    async fetchPlacedOrders(options = {}) {
      const userStore = useUserStore();

      try {
        const params = {
          customer_id: userStore.activeBusiness?.id,
          limit: 25,
          ...options,
        };
        const response = await axios.get("/v2/orders", { params });

        if (response.status === 200) {
          this.editing = false;
          const ordersData = response.data.data;
          this.orders = ordersData.map((data: any) => new Order(data));

          return this.orders;
        }
      } catch (error) {
        handleAxiosRequestError(error);
      }
    },

    async fetchReceivedOrders(options = {}) {
      try {
        const userStore = useUserStore();

        const params = {
          businesses_id: userStore.activeBusiness?.id,
          limit: 50,
          ...options,
        };

        const response = await axios.get("/v2/orders", { params });

        if (response.status === 200) {
          const ordersData = response.data.data;
          this.orders = ordersData.map((data: any) => new Order(data));

          return this.orders;
        }
      } catch (error) {
        handleAxiosRequestError(error);
      }
    },

    async fetchOrder(
      orderId: number,
      editing: boolean = false
    ): Promise<Order | null> {
      try {
        console.log("fetchOrder");
        const response = await axios.get(`/v2/orders/${orderId}`);
        if (response.status == 200) {
          this.editing = false;
          let order = new Order(response.data.data);
          Object.assign(order, {
            order_items: order._order_items.map((item) => {
              return new OrderItem(item);
            }),
          });
          if (editing) {
            const cachedData = await this.loadFromStorage();
            if (order.id == this.editedOrder.id) {
              return this.editedOrder;
            } else {
              this.editedOrder = order;
            }
          }
          return order;
        }

        return null;
      } catch (error) {
        handleAxiosRequestError(error);
        return null;
      }
    },

    async deleteOrder(orderId: number) {
      const toastStore = useToastStore();
      try {
        const response = await axios.delete(`/v2/orders/${orderId}`); // Replace with your API endpoint

        if (response.status == 200) {
          this.orders = this.orders.filter((order) => order.id !== orderId);
          toastStore.showSuccess("Order deleted successfully.");
        }

        return response;
      } catch (error) {
        console.log(error);
        handleAxiosRequestError(error);
        toastStore.showError("Failed to delete order.");
      }

      return null;
    },

    resetForNewOrder() {
      const userStore = useUserStore();

      this.newOrder = new Order({
        uuid: uuidv4(),
        businesses_id: userStore.activeBusiness?.id,
        cms_users_id: userStore.user?.id,
        credits_id: 1,
        gps_location: "-",
        delivery_location: "Ghana",
        product_units_id: 1,
        payment_modes_id: 1,
        order_started_at: formatMySQLDateTime(new Date().toISOString()),
        order_ended_at: "",
        total_items: 0,
        total_sales_price: 0,
        total_discount: 0,
        description: "",
      });
    },

    async updateOrder(orderId: any, updatedData: any): Promise<Boolean> {
      const toastStore = useToastStore();
      try {
        const response = await axios.put(`/v2/orders/${orderId}`, updatedData); // Replace with your API endpoint for updating orders
        // Find the index of the updated order in the store
        const orderIndex = this.orders.findIndex(
          (order) => order.id === orderId
        );
        // console.log(orderIndex, this.orders);
        // if (orderIndex !== -1) {
        // Update the order in the store with the new data
        // this.orders[orderIndex] = new Order(response.data.data);
        this.editing = false;
        toastStore.showSuccess("Order updated successfully.");
        return true;
        // }
      } catch (error) {
        handleAxiosRequestError(error);
        toastStore.showError("Failed to update order.");
        return false;
      }
    },

    async editOrder(orderId: any, editedData: any) {
      const toastStore = useToastStore();
      try {
        const response = await axios.put(`/v2/orders/${orderId}`, editedData); // Replace with your API endpoint for editing orders
        if (response.status === 200) {
          // Find the index of the edited order in the store
          const orderIndex = this.orders.findIndex(
            (order) => order.id === orderId
          );
          if (orderIndex !== -1) {
            // Update the order in the store with the edited data
            this.orders[orderIndex] = new Order(response.data.data);
            toastStore.showSuccess("Order edited successfully.");
          }
        }
      } catch (error) {
        handleAxiosRequestError(error);
        toastStore.showError("Failed to edit order.");
      }
    },

    async removeItem(item: OrderItem): Promise<Object | null> {
      try {
        const response = await axios.delete(`v2/order-items/${item.id}`);
        if (response) {
          return response.data;
        }
        return null;
      } catch (error) {
        handleAxiosRequestError(error);
        return null;
      }
    },

    async reorderOrder(orderId: number) {
      const toastStore = useToastStore();
      try {
        const orderToReorder = this.orders.find(
          (order) => order.id === orderId
        );

        if (!orderToReorder) {
          toastStore.showError("Order not found for reorder.");
          return;
        }

        const newOrderData = {
          businesses_id: orderToReorder.businesses_id,
          customer_id: orderToReorder.customer_id,
        };

        const response = await axios.post("/v2/orders", newOrderData);
        if (response.status === 201) {
          const newOrderData = response.data.data;
          const newOrder = new Order(newOrderData);

          this.orders.push(newOrder);

          toastStore.showSuccess("Order reordered successfully.");
        }
      } catch (error) {
        handleAxiosRequestError(error);
        toastStore.showError("Failed to reorder order.");
      }
    },

    async approveOrder(order: Order) {
      const userStore = useUserStore();
      this.approving = true;

      try {
        const response = await this.changeOrderStatus(order?.id as number, {
          businesses_id: order?.businesses_id as number,
          cms_users_id: userStore.user?.id as number,
          order_id: order?.id as number,
          order_status_id: OrderStatus.APPROVED,
          comment: "",
        });

        return response;
      } catch (error) {
        handleAxiosRequestError(error);
      } finally {
        this.approving = false;
      }
    },

    async cancelOrder(order: Order) {
      const userStore = useUserStore();
      this.cancelling = true;

      try {
        const response = await this.changeOrderStatus(order?.id as number, {
          businesses_id: order?.businesses_id as number,
          cms_users_id: userStore.user?.id as number,
          order_id: order?.id as number,
          order_status_id: OrderStatus.CANCELLED,
          comment: "",
        });

        return response;
      } catch (error) {
        handleAxiosRequestError(error);
      } finally {
        this.cancelling = false;
      }
    },

    async changeOrderStatus(orderId: number, payload: ChangeStatusRequest) {
      try {
        this.changingStatus = true;

        const response = await axios.put(
          `/v2/orders/${orderId}/status`,
          payload
        );

        if (response?.status == 200) {
          const order = this.orders.find((o) => o.id == orderId);

          if (order) {
            order.update({
              order_status: response.data.data.order_status,
              ...response.data.data.order,
            });
          }
          return response;
        } else {
        }
      } catch (error) {
        handleAxiosRequestError(error);

        throw error;
      } finally {
        this.changingStatus = false;
      }
    },

    addToEditingOrder(product: Product, quantity = 1) {
      const toastStore = useToastStore();
      const userStore = useUserStore();
      if (
        product &&
        product?.businesses_id !== this.editedOrder?.businesses_id
      ) {
        toastStore.showError(
          `Please add a product from ${
            this.editedOrder?.business?.name?.split(" ")[0]
          }`,
          "",
          "bottom",
          "footer"
        );
        return;
      }
      let orderItem = this.editedOrder._order_items.find(
        (item: OrderItem) => item.products_id == product.id
      );
      if (!orderItem) {
        orderItem = new OrderItem({
          product: product,
          businesses_id: product.businesses_id,
          products_id: product.id,
          product_price: product.product_price,
          currency_symbol: product.currency?.symbol,
          product_image: product.image,
          product_name: product.product_name,
          unit_price: product.product_price,
          quantity: quantity,
          total_price: quantity * (product.product_price || 0),
          currencies_id: 1, // GHS
          product_units_id: 1, // GHS
          cms_users_id: userStore.user?.id,
        });

        this.editedOrder._order_items.push(orderItem);
        toastStore.showSuccess("Added To Order");
      } else {
        orderItem.quantity = orderItem.quantity ? orderItem.quantity + 1 : 1;
        orderItem.total_price = orderItem.unit_price
          ? orderItem.unit_price * orderItem.quantity
          : 0;
        toastStore.showInfo("Increased quantity in Order");
      }
      this.persist();
    },

    isProductSelected(product: Product): boolean {
      const index = this.newOrder.order_items?.findIndex(
        (item: OrderItem) => item.products_id == product.id
      ) as number;

      return !isNaN(index) ? index > -1 : false;
    },

    addProductToOrder(product: Product) {
      const orderItem = new OrderItem({
        uuid: uuidv4(),
        quantity: 1,
        unit_price: product.product_price,
        total_price: product.product_price,
        products_id: product.id,
        product: product,
        product_units_id: 1,
        currencies_id: 1,
        cms_users_id: this.newOrder.cms_users_id,
        description: "",
        is_on_sale: 0,
        businesses_id: product.businesses_id,
        product_price: product.product_price,
        currency_symbol: product.currency?.symbol,
        product_image: product.image,
        product_name: product.product_name,
      });
      this.newOrder.order_items?.push(orderItem);
    },
    removeProductFromOrder(product: Product) {
      const index = this.newOrder.order_items?.findIndex(
        (item: OrderItem) => item.products_id == product.id
      );
      this.newOrder.order_items?.splice(index as number, 1);
    },
    async recordOrder(): Promise<Order | null> {
      const location = useGeolocation();
      const coordinates = await location.getCurrentLocation();
      console.log(this.newOrder);
      const newOrder = new Order(this.newOrder);
      newOrder?.update({
        order_ended_at: formatMySQLDateTime(new Date().toISOString()),
        gps_location: coordinates
          ? `${coordinates.coords.latitude}, ${coordinates.coords.longitude}`
          : "-",
      });

      this.recordedOrders.push(newOrder);
      this.persistRecordedOrders();
      this.startOrderDataSync();

      return newOrder;
    },
    async persistRecordedOrders() {
      const userStore = useUserStore();
      const CACHE_KEY = `${KOLA_RECORDED_ORDERS}.${userStore.activeBusiness?.id}`;

      storage.set(CACHE_KEY, this.recordedOrders, 14, "days");
    },
    async persist() {
      await storage.set(KOLA_EDITED_ORDER, this.editedOrder, 1, "days");
      await storage.set(KOLA_SALE_AGENT_ORDER, this.newOrder, 1, "days");
      await storage.set(
        KOLA_AGENT_SELECTED_CUSTOMER,
        this.selectedCustomer,
        1,
        "days"
      );
    },
  },
});
