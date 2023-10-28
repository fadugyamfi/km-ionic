import axios from "axios";
import {defineStore} from "pinia";
import { useToastStore } from '@/stores/ToastStore';
import AppStorage from './AppStorage';
import User from "@/models/User";
import { SaleType } from "@/models/SaleType";
import { Sale } from "@/models/Sale";
import Product from "../models/Product";
import { SaleItem } from "../models/SaleItem";
import { useUserStore } from "./UserStore";
import { formatDateMySQL, formatMySQLDateTime, handleAxiosRequestError } from "../utilities";

const storage = new AppStorage();
const KOLA_SALES = 'kola.sales';

export const useSaleStore = defineStore("sale", {

    state() {
        return {
            newSale: new Sale({}),
            sales: [] as Sale[]
        }
    },

    actions: {
        resetForNewSale() {
            const userStore = useUserStore();

            this.newSale = new Sale({
                businesses_id: userStore.activeBusiness?.id,
                cms_users_id: userStore.user?.id,
                credits_id: 1,
                gps_location: '-',
                delivery_location: 'Ghana',
                product_units_id: 1,
                payment_modes_id: 1,
                sale_types_id: 1,
                sale_started_at: formatMySQLDateTime(new Date().toISOString()),
                sale_ended_at: '',
                total_items: 0,
                total_sales_price: 0,
                total_discount: 0,
                description: ''
            });
        },

        addProductToSale(product: Product) {
            const saleItem = new SaleItem({
                quantity: 1,
                unit_price: product.product_price,
                total_price: product.product_price,
                products_id: product.id,
                product: product,
                product_units_id: 1,
                currencies_id: 1,
                cms_users_id: this.newSale.cms_users_id,
                businesses_id: this.newSale.businesses_id,
                description: '',
                is_on_sale: 0
            });
            this.newSale.sale_items?.push(saleItem)
        },

        removeProductFromSale(product: Product) {
            const index = this.newSale.sale_items?.findIndex((item: SaleItem) => item.products_id == product.id);
            this.newSale.sale_items?.splice(index as number, 1);
        },

        isProductSelected(product: Product): boolean {
            const index = this.newSale.sale_items?.findIndex((item: SaleItem) => item.products_id == product.id) as number;

            return !isNaN(index) ? index > -1 : false;
        },

        async recordSale(): Promise<Sale | null> {
            this.newSale.update({
                sale_ended_at: formatMySQLDateTime(new Date().toISOString())
            })

            return axios.post('/v2/sales', this.newSale)
                .then(response => {
                    const sale = new Sale(response.data.data);
                    this.sales.unshift(sale);

                    return sale;
                })
                .catch(error => {
                    handleAxiosRequestError(error);

                    return null;
                });
        }
    }
});
