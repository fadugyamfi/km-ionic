import Business from "./Business";
import Currency from "./Currency";
import Tag from "./Tag";
import ProductImage from "./ProductImage";
import { FavoritedProduct, VolumeUnit, WeightUnit } from "./types";

export default class Product {
  public id?: number;
  public businesses_id?: number;
  public product_name?: string;
  public product_description?: string;
  public _product_price?: number = 0;
  public wholesale_price: number = 0;
  public retail_price: number = 0;
  public single_unit_price?: number;
  public single_piece_price?: number;
  public product_banner_image?: string;
  public product_images: ProductImage[] = [];
  public product_groups_id?: number;
  public product_categories_id?: number;
  public product_units_id?: number;
  public image?: string;
  public weight_value?: string | number;
  public volume_value?: string | number;
  public weight_unit?: WeightUnit;
  public volume_unit?: VolumeUnit;
  public group_quantity?: number;
  public quantity?: number;
  private _currency?: Currency | null;
  public _business?: Business | null;
  public _tags?: Tag[] | null;
  public favorited?: FavoritedProduct | null;
  public is_on_sale: number = 0;
  public sale_price: number = 0;
  public preferRetailPrice = false;

  constructor(data: any) {
    if (data._business) {
      data.business = data._business;
    }

    if (data._tags) {
      data.tags = data._tags;
    }

    if (data._currency) {
      data.currency = data._currency;
    }

    if(data.is_on_sale) {
      data.preferRetailPrice = true
    }

    Object.assign(this, data);
  }

  update(data: object) {
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

  get discountApplied() {
    const sale_price = Number(this.sale_price);
    const product_price = Number(this.product_price);
    return Math.ceil(((product_price - sale_price) / product_price) * 100);
  }

  get product_price() {
    if( this.preferRetailPrice && this.retail_price > 0 ) {
      return this.retail_price;
    }

    if (this.wholesale_price > 0) {
      return this.wholesale_price;
    }

    return this._product_price as number;
  }

  set product_price(value: number) {
    this._product_price = value;
  }
}
