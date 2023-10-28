import axios from "axios";
import { defineStore } from "pinia";
import Product from "@/models/Product";
import { Order } from "@/models/Order";
import { useToastStore } from '@/stores/ToastStore';
import { useBusinessStore } from '@/stores/BusinessStore';
import AppStorage from './AppStorage';

const storage = new AppStorage();
const KOLA_CART = 'kola.cart';


const businessStore = useBusinessStore()

export type CartItem = {
    product: Product;
    quantity: number;
};

export const useCartStore = defineStore("cart", {

    state: () => {
        return {
            items: [] as CartItem[],
            businesses: [] as any,
            orders: [] as Order[]
        }
    },

    actions: {
        async loadFromStorage() {
            let items = await storage.get(KOLA_CART);

            this.items = (items || []) as CartItem[];

            return items;
        },

        getProductItem(product: Product): CartItem | undefined {
            return this.items.find(el => el.product.id == product.id);
        },

        hasProduct(product: Product): boolean {
            if (!product || !this.items) {
                return false;
            }

            const index = this.items.findIndex(el => el.product.id == product.id);

            return index > -1;
        },

        addProduct(product: Product, quantity = 1) {
            const toastStore = useToastStore();

            if (this.hasProduct(product)) {
                this.updateQuantity(product);
                toastStore.showInfo('Increased quantity in cart');
            } else {
                this.items.push({ product, quantity })
                toastStore.showSuccess('Added To Cart');
            }

            this.persist();
            return this;
        },

        addProductToBusiness(product: Product, quantity = 1) {
            this.addProduct(product, quantity)
            const existingBusiness = this.businesses.find((item: any) => item.id == product.businesses_id)
            if (existingBusiness) {
                const index = this.businesses.findIndex((item: any) => item.id == existingBusiness.id)
                if (index > -1) {
                    this.businesses[index].cartItems.push({ product, quantity })
                }
            } else {
                const allBusinesses = businessStore.businesses
                const business = allBusinesses?.find(business => business.id == product.businesses_id)
                this.businesses.push({ id: product.businesses_id, business, cartItems: [{ product, quantity }] })
            }
            return this;
        },

        removeAtIndex(index: number) {
            this.items.splice(index, 1);

            const toastStore = useToastStore();
            toastStore.showSuccess('Removed From Cart');

            this.persist();
            return this;
        },

        removeProduct(product: Product) {
            const index = this.items.findIndex(el => el.product.id == product.id);

            if (index > -1) {
                return this.removeAtIndex(index);
            }

            return this;
        },

        updateQuantity(product: Product, quantity: number = 0) {
            if (!this.hasProduct(product)) {
                return;
            }

            const item = this.getProductItem(product);

            if (item) {
                item.quantity = quantity ? quantity : item.quantity++;
                this.persist();
            }

            return this;
        },

        async persist() {
            await storage.set(KOLA_CART, this.items, 30, 'days');
        }
    }
});
