import { NullableNumber, NullableString, NullableStringOrNumber } from "@/utilities/Types";
import { FavoritedBrand } from "./types";
import { FavoritedBusiness } from "./types";
import Currency from "./Currency";
import Tag from "./Tag";


export default class Business {

    public id?: number | string;
    public name?: string;
    public location: NullableString = null;
    public email?: string;
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
    public favorited?: FavoritedBusiness | null;
    public deliveryTime?: string;
    public tags?: Tag[];

    constructor(data: object | null) {
        Object.assign(this, data);
    }

    get currency(): Currency | undefined {
        return this._currency;
    }

    set currency(value: any) {
        this._currency = new Currency(value);
    }

    addToFavorites(favorited?: FavoritedBusiness) {
        this.favorited = favorited || {
            businesses_id: this.id as number
        };
    }

    unfavorite() {
        this.favorited = null;
    }

    getInitials(length: number = 3) {
        return this.name?.split(" ").map((n)=>n[0]).join("").toUpperCase().substring(0, length);
    }
}
