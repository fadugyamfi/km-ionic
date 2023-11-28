import Product from "./Product";
export default class PromotionItem {
  public promotion_id?: number | string;
  public promo_price?: number;
  public _product?: Product | null;

  constructor(data: object) {
    Object.assign(this, data);
  }

  get product(): Product | null | undefined {
    return this._product;
  }

  set product(value: object) {
    this._product = value ? new Product(value) : null;
  }
}
