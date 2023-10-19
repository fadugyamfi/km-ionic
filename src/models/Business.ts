import { NullableNumber, NullableString, NullableStringOrNumber } from "@/utilities/Types";
import Currency from "./Currency";
import { FavoritedBrand } from "./types";


export default class Business {
    addToFavorites() {
        throw new Error("Method not implemented.");
    }
    unfavorite() {
        throw new Error("Method not implemented.");
    }

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
    public rating?: number = 1;
    public distance?: number = 0;
    public favorited?: FavoritedBrand | null;


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
