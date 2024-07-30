import Product from "./Product";

/**
 * @class PromotionItem
 * 
 * Display retail prices by default
 */
export default class PromotionItem {
  public id?: number | string;
  public promotion_id?: number | string;
  public promo_price?: number;
  public _product?: Product | null;

  constructor(data: any) {
    if( data._product ) {
      data.product = data._product;
    }

    Object.assign(this, data);
  }

  get product(): Product | null | undefined {
    return this._product;
  }

  set product(value: object) {
    const p = value ? new Product(value) : null;

    if( p ) {
      p.preferRetailPrice = true;
    }

    this._product = p;
  }
}
