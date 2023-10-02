import { NullableNumber, NullableString, NullableStringOrNumber } from "../utilities/Types";
import Currency from "./Currency";


export default class Business {

    public id: NullableStringOrNumber = null;
    public name?: string;
    public location: NullableString = null;
    public phone_number: NullableString = null;
    public description: NullableString = null;
    public min_order_amount: NullableStringOrNumber = null;
    public currency_id: NullableNumber = null;
    public region_id: NullableNumber = null;
    public country_id: NullableNumber = null;
    public state_id: NullableNumber = null;
    public _currency?: Currency;
    public logo?: string;
    public reviews_count?: number = 0;

    constructor(data: object | null) {
        Object.assign(this, data);
    }

    get currency(): Currency | undefined {
        return this._currency;
    }

    set currency(value: any) {
        this._currency = new Currency(value);
    }
}