import Business from "./Business";
import Currency from "./Currency";
import Tag from "./Tag";
import { FavoritedProduct } from "./types";

export default class Stock {
  public id?: number;
  public businesses_id?: number;
  public product_name?: string;
  public product_description?: string;
  public product_price?: number = 0;
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
  public min_order_amount?: string | number;
  public brands_id?: string | number;
  public product_sku?: string | number;
  public group_quantity?: number;
  private _currency?: Currency | null;
  public _business?: Business | null;
  public _tags?: Tag[] | null;
  public favorited?: FavoritedProduct | null;
  public stock_quantity?: number = 0;

  constructor(data: object) {
    Object.assign(this, data);
  }

  get currency(): Currency | null | undefined {
    return this._currency;
  }

  set currency(value: object) {
    this._currency = value ? new Currency(value) : null;
  }

  get business(): Business | null | undefined {
    return this._business;
  }

  set business(value: object) {
    this._business = value ? new Business(value) : null;
  }

  get tags(): Tag[] | null | undefined {
    return this._tags;
  }

  set tags(value: Array<any>) {
    this._tags = value ? value.map((el) => new Tag(el)) : [];
  }

  addToFavorites(favorited?: FavoritedProduct) {
    this.favorited = favorited || {
      products_id: this.id as number,
    };
  }

  unfavorite() {
    this.favorited = null;
  }
}
