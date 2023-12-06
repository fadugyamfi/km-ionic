
import Currency from './Currency';
import Product from './Product';
import ProductUnit from './ProductUnit';
export class OrderItem {

    public id?: number | string;
    public businesses_id?: number;
    public cms_users_id?: number | string;
    public products_id? : number;
    public product_name? : string;
    public product_image? : string;
    public product_price? : number;
    public currencies_id?: number;
    public currency_symbol?: string;
    public product_units_id?: number;
    public unit_price?: number;
    public total_price?: number;
    public quantity?: number = 1;

    public _product?: Product | null;
    public _currency?: Currency;
    public _product_unit?: ProductUnit;

    constructor(data: object) {
        Object.assign(this, data);
    }

    update(data: object) {
        Object.assign(this, data);
    }

    get product(): Product | null | undefined {
        return this._product;
    }

    set product(value: object) {
        this._product = value ? new Product(value): null;
    }

    get currency(): Currency | undefined {
        return this._currency;
    }

    set currency(value: object) {
        this._currency = new Currency(value || { symbol: 'GHS' });
    }

    get product_unit(): ProductUnit | undefined {
        return this._product_unit;
    }

    set product_unit(value: object) {
        this._product_unit = new ProductUnit(value || {});
    }
}
