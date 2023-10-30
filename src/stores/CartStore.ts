import axios from "axios";
import { defineStore } from "pinia";
import Product from "@/models/Product";
import { Order } from "@/models/Order";
import { useToastStore } from "@/stores/ToastStore";
import { useBusinessStore } from "@/stores/BusinessStore";
import AppStorage from "./AppStorage";
import { useUserStore } from "./UserStore";
import { OrderItem } from "../models/OrderItem";

const storage = new AppStorage();
const KOLA_CART = "kola.cart";

const businessStore = useBusinessStore();

export type CartItem = {
  product: Product;
  quantity: number;
  product_name: string;
  product_image: string;
  product_price: number;
  currency_symbol: string;
};

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      items: [] as CartItem[],
      orders: [] as Order[],
    };
  },

  actions: {
    async loadFromStorage() {
      let data = await storage.get(KOLA_CART);

      this.orders = (data.map((d: object) => new Order(d)) || []) as Order[];

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
      if (!product || !this.orders) {
        return false;
      }

      let exists = false;

      this.orders.forEach((order: Order) => {
        const index = order.order_items.findIndex(
          (el) => (el.products_id = product.id)
        );
        if (index > -1) {
          exists = true;
          return false;
        }
      });

      return exists;
    },

    // addProduct(product: Product, quantity = 1) {
    //     const toastStore = useToastStore();

    //     if (this.hasProduct(product)) {
    //         this.updateQuantity(product);
    //         toastStore.showInfo('Increased quantity in cart');
    //     } else {
    //         this.items.push({ product, quantity })
    //         toastStore.showSuccess('Added To Cart');
    //     }

    //     this.persist();
    //     return this;
    // },

    getTotalCost() {
      return this.orders.reduce((acc, value) => acc + value.getTotal(), 0);
    },

    addProduct(product: Product, quantity = 1) {
      const toastStore = useToastStore();
      const userStore = useUserStore();

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
        });

        order.order_items.push(orderItem);

        toastStore.showSuccess("Added To Cart");
      } else {
        orderItem.quantity = quantity;
        toastStore.showInfo("Increased quantity in cart");
      }
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

    removeProduct(product: Product) {
      const index = this.orders.findIndex((el) => el.product.id == product.id);

      if (index > -1) {
        return this.removeAtIndex(index);
      }

      return this;
    },

    updateQuantity(product: Product, quantity: number = 0) {
      // if (!this.hasProduct(product)) {
      //     return;
      // }
      // const item = this.getProductItem(product);
      // if (item) {
      //     item.quantity = quantity ? quantity : item.quantity++;
      //     this.persist();
      // }
      // return this;
    },

    async persist() {
      await storage.set(KOLA_CART, this.orders, 30, "days");
      console.log("persist", this.orders);
    },
  },
});
