import axios from "axios";
import { defineStore } from "pinia";
import Product from "@/models/Product";
import { Order } from "@/models/Order";
import { useToastStore } from "@/stores/ToastStore";
import { useBusinessStore } from "@/stores/BusinessStore";
import AppStorage from "./AppStorage";
import { useUserStore } from "./UserStore";
import { OrderItem } from "../models/OrderItem";
import { handleAxiosRequestError } from "@/utilities";
import { useOrderStore } from "./OrderStore";

const storage = new AppStorage();
const KOLA_CART = "kola.cart";

export type CartItem = {
  product: Product;
  quantity: number;
  product_name: string;
  product_image: string;
  product_price: number;
  currency_symbol: string;
  total_price: number;
  total_order_amount: number;
};

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      items: [] as CartItem[],
      orders: [] as Order[],
      placedOrder: {} as Order,
    };
  },

  actions: {
    async createOrder(postData: Object): Promise<Order | null> {
      // const userStore = useUserStore();
      return axios
        .post(`/v2/orders`, postData)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            this.placedOrder = new Order(response.data.data);
            return this.placedOrder;
          } else return null;
        })
        .catch((error) => {
          handleAxiosRequestError(error);
          return null;
        });
    },

    async loadFromStorage() {
      let data = await storage.get(KOLA_CART);

      this.orders = (
        data ? data.map((d: object) => new Order(d)) : []
      ) as Order[];

      return this;
    },

    getProductItem(product: Product): OrderItem | null {
      let existingProduct: OrderItem | null = null;

      this.orders.forEach((order: Order) => {
        const p = order.order_items.find((el) => (el.products_id = product.id));

        if (p) {
          existingProduct = p;
          return false;
        }
      });

      return existingProduct;
    },

    hasProduct(product: Product): boolean {
      // if (!product || !this.orders) {
      //   return false;
      // }

      // let exists = false;
      const order = this.orders.find(
        (o) => o.businesses_id == product?.businesses_id
      );

      if (!order) {
        return false;
      }

      return (
        (order?.order_items.findIndex(
          (oi) => oi.products_id == product.id
        ) as number) > -1
      );

      // this.orders.forEach((order: Order) => {
      //   const index = order.order_items.findIndex(
      //     (el) => (el.products_id = product.id)
      //   );
      //   if (index > -1) {
      //     exists = true;
      //     return false;
      //   }
      // });

      // return exists;
    },

    getTotalCost() {
      return this.orders.reduce((acc, value) => acc + value.getTotal(), 0);
    },

    addProduct(product: Product, quantity = 1) {
      const toastStore = useToastStore();
      const userStore = useUserStore();
      const orderStore = useOrderStore();

      if (orderStore.editing) {
        orderStore.addToEditingOrder(product, quantity);
        return;
      }

      let order = this.orders.find(
        (order) => order.businesses_id == product.businesses_id
      );

      if (!order) {
        order = new Order({
          businesses_id: product.businesses_id,
          customer_id: userStore.activeBusiness?.id,
          cms_users_id: userStore.user?.id,
          business: product.business,
        });

        this.orders.push(order);
      }

      let orderItem = order.order_items.find(
        (item: OrderItem) => item.products_id == product.id
      );

      if (!orderItem) {
        orderItem = new OrderItem({
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

        order.order_items.push(orderItem);

        toastStore.showSuccess("Added To Cart");
      } else {
        orderItem.quantity = quantity;
        toastStore.showInfo("Increased quantity in cart");
      }
      console.log(this.orders);
      this.persist();
      return this;
    },

    removeOrderAtIndex(order: any) {
      const index = this.orders.findIndex(
        (item) => item.businesses_id == order.businesses_id
      );
      this.orders.splice(index, 1);
      const toastStore = useToastStore();
      toastStore.showSuccess("Removed From Cart");
      this.persist();
      return this;
    },

    removeAtItemIndex(business: Order, itemIndex: number) {
      const businessIndex = this.orders.findIndex(
        (order) => order.businesses_id == business.businesses_id
      );
      this.orders[businessIndex].order_items.splice(itemIndex, 1);
      const toastStore = useToastStore();
      toastStore.showSuccess("Removed From Cart");
      this.persist();
      return this;
    },

    removeAtIndex(index: number) {
      this.orders.splice(index, 1);
      const toastStore = useToastStore();
      toastStore.showSuccess("Removed From Cart");
      this.persist();
      return this;
    },

    updateQuantity(product: Product, quantity = 1) {
      const order = this.orders.find(
        (o) => o.businesses_id == product.businesses_id
      );
      const orderItem = order?.order_items.find(
        (oi) => oi.products_id == product.id
      );

      if (!orderItem) {
        return;
      }

      orderItem.quantity = quantity;
    },

    reOrder(order: Order) {
      const userStore = useUserStore();

      let newOrder = this.orders.find(
        (order) => order.businesses_id == order.businesses_id
      );

      if (!newOrder) {
        newOrder = new Order({
          businesses_id: order.businesses_id,
          customer_id: userStore.activeBusiness?.id,
          cms_users_id: userStore.user?.id,
          business: order.business,
          order_items: [],
        });
      }

      this.orders.push(newOrder);
      let orderItems = order.order_items.map((item) => {
        return new OrderItem({
          businesses_id: item.businesses_id,
          products_id: item.id,
          product_price: item?.product?.product_price,
          currency_symbol: item.currency?.symbol,
          product_image: item?.product?.image,
          product_name: item?.product?.product_name,
          unit_price: item?.product?.product_price,
          quantity: item.quantity,
          total_price: item.total_price,
          currencies_id: 1, // GHS
          product_units_id: 1, // GHS
          cms_users_id: userStore.user?.id,
        });
      });
      newOrder.order_items = orderItems;
      this.persist();
    },

    clearCart() {
      this.orders = [];
      this.persist();
    },

    async persist() {
      await storage.set(KOLA_CART, this.orders, 30, "days");
    },
  },
});
