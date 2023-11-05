

/*
order_status_id
 1 = Pending
 2 = Pre-Approved
 3 = Approved
 4 = Partially paid
 5 = Paid
 6 = Out for delivery
 7 = Delivered
 8 = Cancelled
 9 = Rejected
 10 = Refunded
*/
import Business from "./Business";
import Currency from "./Currency";
import { OrderItem } from "./OrderItem";
import { OrderStatusHistory } from "./OrderStatusHistory";
import ProductUnit from "./ProductUnit";

export class Order {
    [x: string]: any;

    public id?: number | string;
    public businesses_id?: number;
    public customer_id?: number;
    public total_order_amount?: number;
    public order_status_id?: number;
    public created_at?: string | number | Date;
    public order_status?: any;
    public start_dt?: string | number | Date;
    public product_units_id?: number;
    public delivery_location?: string;
    public delivery_date?: string;

    public _order_status_histories: OrderStatusHistory[] = [];
    public _order_items: OrderItem[] = [];
    public _customer?: Business;
    public _business?: Business;
    public _currency?: Currency;

    constructor(data: object) {
        Object.assign(this, data);
    }

    update(data: object) {
        Object.assign(this, data);
    }

    getTotal() {
        return this.order_items.reduce((acc, value) => acc + (value.total_price || 0), 0)
    }

    get order_items(): OrderItem[] {
        return this._order_items;
    }

    set order_items(items: object[]) {
        this._order_items = items ? items.map(item => new OrderItem(item)) : [];
    }

    get customer(): Business | undefined {
        return this._customer;
    }

    set customer(value: object) {
        this._customer = new Business(value || {});
    }

    get business(): Business | undefined {
        return this._business;
    }

    set business(value: object) {
        this._business = new Business(value || {});
    }

    get order_status_histories(): OrderStatusHistory[] {
        return this._order_status_histories;
    }

    set order_status_histories(history: object[]) {
        this._order_status_histories = history?.map(h => new OrderStatusHistory(h));
    }

    getLastOrderStatusHistory(orderStatusId: number): OrderStatusHistory | undefined {
        return this.order_status_histories.find(h => h.order_status_id == orderStatusId);
    }

}
