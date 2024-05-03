import Product from './Product';

export class SaleItem {

    public id?: number | string;
    public uuid?: string;
    public businesses_id?: number;
    public products_id?: number;
    public quantity = 0;
    public unit_price? = 0;
    public total_price? = 0;
    public product_units_id?: number

    public _product?: Product | null;

    constructor(data: object) {
        this.update(data);
    }

    update(data: object) {
        Object.assign(this, data);
    }

    get product(): Product | null | undefined {
        return this._product;
    }

    set product(value: object) {
        this._product = value ? new Product(value) : null;
    }


}
