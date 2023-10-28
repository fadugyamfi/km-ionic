export class OrderItem {

    public id?: number | string;
    public businesses_id?: number;
    public products_id? : number;
    public currencies_id?: number;
    public product_units_id?: number;
    public unit_price?: number;
    public total_price?: number;
    public quantity?: number = 1;

    constructor(data: object) {
        Object.assign(this, data);
    }

    update(data: object) {
        Object.assign(this, data);
    }
}
