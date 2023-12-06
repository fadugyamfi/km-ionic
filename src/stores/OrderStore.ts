import { defineStore } from "pinia";
import AppStorage from "./AppStorage";
import { Order, OrderStatus } from "@/models/Order";
import { useToastStore } from "./ToastStore";
import axios from "axios";
import { handleAxiosRequestError } from "../utilities";
import { useUserStore } from "./UserStore";
import { ChangeStatusRequest } from "../models/types";
import Product from "@/models/Product";
import { OrderItem } from "@/models/OrderItem";

const storage = new AppStorage();
const KOLA_EDITED_ORDER = "kola.edited-order";

export const useOrderStore = defineStore("order", {
  state: () => {
    return {
      orders: [] as Order[],
      editedOrder: {} as Order,
      editing: false,
      approving: false,
      cancelling: false,
    };
  },

  actions: {
    async loadFromStorage() {
      let data = await storage.get(KOLA_EDITED_ORDER);
      console.log(data);
      Object.assign(this.editedOrder, data);
    },

    async fetchPlacedOrders(options = {}) {
      const userStore = useUserStore();

      try {
        const params = {
          customer_id: userStore.activeBusiness?.id,
          limit: 50,
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
      }
    },

    addToEditingOrder(product: Product, quantity = 1) {
      const toastStore = useToastStore();
      const userStore = useUserStore();
      if (
        product &&
        product?.businesses_id !== this.editedOrder?.businesses_id
        product?.businesses_id !== this.editedOrder?.businesses_id
      ) {
        toastStore.showError(
          `Please add a product from ${
            this.editedOrder?.business?.name?.split(" ")[0]
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
        toastStore.showInfo("Increased quantity in Order");
      }
      this.persist();
    },
    async persist() {
      await storage.set(KOLA_EDITED_ORDER, this.editedOrder, 1, "days");
    },
  },
});
