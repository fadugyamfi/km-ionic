import Currency from './Currency';

export default class Product {

    public id?: number;
    public product_name?: string;
    public product_description?: string;
    public product_price?: number;
    public wholesale_price?: number;
    public retail_price?: number;
    public single_unit_price?: number;
    public product_banner_image?: string;
    public product_groups_id?: number;
    public product_categories_id?: number;
    public product_units_id?: number;
    public image?: string;
    public weight_value?: string | number;
    public volume_value?: string | number;
    public group_quantity?: number;
    private _currency?: Currency;


    constructor(data: object) {
        Object.assign(this, data);
    }

    get currency(): Currency {
        return this._currency
    }

    set currency(value: object) {
        this._currency = value ? new Currency(value) : null;
    }
}
