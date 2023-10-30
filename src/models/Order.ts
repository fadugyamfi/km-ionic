

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
import { OrderItem } from "./OrderItem";

export class Order {
    [x: string]: any;

    public id?: number | string;
    public businesses_id?: number;
    public customer_id?: number;
    public total_order_amount?: number;
    public order_status_id?: number;
    public created_at: string | number | Date | undefined;
    public order_status: any;
    public start_dt: string | number | Date | undefined;
    public product_units_id: number| undefined;

    public order_items: OrderItem[] = [];

    constructor(data: object) {
        Object.assign(this, data);
    }

    update(data: object) {
        Object.assign(this, data);
    }

    getTotal() {
        return this.order_items.reduce((acc, value) => acc + (value.total_price || 0), 0)
    }
}
