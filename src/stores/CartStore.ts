import axios from "axios";
import {defineStore} from "pinia";
import Product from "@/models/Product";
import { useToastStore } from '@/stores/ToastStore';
import AppStorage from './AppStorage';

const storage = new AppStorage();
const KOLA_CART = 'kola.cart';

export type CartItem = {
    product: Product;
    quantity: number;
};

export const useCartStore = defineStore("cart", {

    state: () => {
        return {
            items: [] as CartItem[]
        }
    },

    actions: {
        async loadFromStorage() {
            let items = await storage.get(KOLA_CART);

            this.items = (items || []) as CartItem[];

            return items;
        },

        getProductItem(product: Product) {
            return this.items.find(el => el.product.id == product.id);
        },

        hasProduct(product: Product): boolean {
            if( !product || !this.items ) {
                return false;
            }

            const index = this.items.findIndex(el => el.product.id == product.id);

            return index > -1;
        },

        addProduct(product: Product, quantity = 1) {
            const toastStore = useToastStore();

            if( this.hasProduct(product) ) {
                this.updateQuantity(product);
                toastStore.showInfo('Increased quantity in cart');
            } else {
                this.items.push({ product, quantity })
                toastStore.showSuccess('Added To Cart');
            }

            this.persist();
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

            if( index > -1 ) {
                return this.removeAtIndex(index);
            }

            return this;
        },

        updateQuantity(product: Product, quantity: number = null) {
            if( !this.hasProduct(product)) {
                return;
            }

            const item = this.getProductItem(product);

            item.quantity = quantity ? quantity : item.quantity++;

            this.persist();

            return this;
        },

        async persist() {
            await storage.set(KOLA_CART, this.items, 30, 'days');
        }
    }
});
