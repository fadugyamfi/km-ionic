export class SaleItem {

    public id?: number | string;
    public businesses_id?: number;
    public products_id?: number;
    public quantity = 0;
    public unit_price? = 0;
    public total_price? = 0;

    constructor(data: object) {
        Object.assign(this, data);
    }
}
