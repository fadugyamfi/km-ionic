import {
  NullableNumber,
  NullableString,
  NullableStringOrNumber,
} from "@/utilities/Types";
import Currency from "./Currency";
import Tag from "./Tag";

export default class Customer {
  public id?: number | string;
  public name?: string;
  public location: NullableString = null;
  public phone_number: NullableString = null;
  public business_owner_phone: NullableString = null;
  public description: NullableString = null;
  public created_at?: string;
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
  public deliveryTime?: string;
  public business_types_id?: number | string;
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

  getInitials(length: number = 3) {
    return this.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, length);
  }
}
