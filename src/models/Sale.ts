import Business from './Business';
import Product from './Product';
import { SaleItem } from './SaleItem';
import { SaleType, SaleTypes } from './SaleType';
export class Sale {

    public id?: number | string;
    public businesses_id?: number;
    public cms_users_id?: number;
    public sale_types_id?: number;
    public payment_modes_id?: number;
    public customer_id?: number;
    public credits_id?: number;
    public gps_location?: string;
    public delivery_location?: string;
    public product_units_id?: number;
    public sale_started_at?: string;
    public sale_ended_at?: string;
    public total_items?: number = 0;
    public total_sales_price?: number = 0;
    public total_discount?: number = 0;
    public created_at?: string;

    public _sale_items?: SaleItem[] = [];
    public sale_items_count?: number = 0;
    public _sale_payments?: SalePayment[] = [];
    public sale_payments_sum_amount?: number = 0;

    public _product?: Product | null;
    public _business?: Business | null;
    public _customer?: Business | null;
    public _saleType?: SaleType | null;

    constructor(data: object) {
        this.update(data);
    }

    update(data: object) {
        Object.assign(this, data);
    }

    isCreditSale() {
        return this.sale_types_id == SaleTypes.CREDIT_SALE;
    }

    isCashSale() {
        return this.sale_types_id == SaleTypes.CASH_SALE;;
    }

    amountOwed() {
        return this.isCreditSale() && this.sale_payments_sum_amount < this.total_sales_price;
    }

    get product(): Product | null | undefined {
        return this._product;
    }

    set product(value: object) {
        this._product = value ? new Product(value) : null;
    }

    get customer(): Business | null | undefined {
        return this._customer;
    }

    set customer(value: object) {
        this._customer = value ? new Business(value) : null;
    }

    get business(): Business | null | undefined {
        return this._business;
    }

    set business(value: object) {
        this._business = value ? new Business(value) : null;
    }

    get sale_type(): SaleType | null | undefined {
        return this._saleType;
    }

    set sale_type(value: object) {
        this._saleType = value ? new SaleType(value) : null;
    }

    get sale_items(): SaleItem[] | undefined {
        return this._sale_items;
    }

    set sale_items(value: Array) {
        this._sale_items = value ? value.map(el => new SaleItem(el)) : [];
    }

    get sale_payments(): SalePayment[] | undefined {
        return this._sale_payments;
    }

    set sale_payments(value: Array) {
        if( !value || value.length == 0 ) {
            this._sale_payments = [];
        } else {
            this._sale_payments = value.map(el => {
                if( !el.business && this.business ) {
                    el.business = this.business;
                }
                return new SalePayment(el)
            });
        }
    }
}
