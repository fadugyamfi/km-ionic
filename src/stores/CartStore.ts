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
};

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      items: [] as CartItem[],
      businesses: [] as any,
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

      // this.addProduct(product, quantity)
      // const existingBusiness = this.businesses.find((item: any) => item.id == product.businesses_id)
      // if (existingBusiness) {
      //     const index = this.businesses.findIndex((item: any) => item.id == existingBusiness.id)
      //     if (index > -1) {
      //         this.businesses[index].cartItems.push({ product, quantity })
      //     }
      // } else {
      //     const allBusinesses = businessStore.businesses
      //     const business = allBusinesses?.find(business => business.id == product.businesses_id)
      //     this.businesses.push({ id: product.businesses_id, business, cartItems: [{ product, quantity }] })
      // }
      return this;
    },

    removeAtIndex(index: number) {
      this.items.splice(index, 1);

      const toastStore = useToastStore();
      toastStore.showSuccess("Removed From Cart");

      this.persist();
      return this;
    },

    removeProduct(product: Product) {
      const index = this.items.findIndex((el) => el.product.id == product.id);

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
    },
  },
});
