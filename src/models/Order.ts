

export class Order {

    public id?: number | string;
    public businesses_id?: number;
    public customer_id?: number;
    public total_order_amount?: number;
    public order_status_id?: number;

    constructor(data: object) {
        Object.assign(this, data);
    }
}
