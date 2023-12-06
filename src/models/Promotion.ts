import PromotionItem from "./PromotionItem";

export default class Promotion {
  public id?: number | string;
  public name?: string;
  public position?: number;
  public _promotion_items?: PromotionItem[];

  constructor(data: object) {
    Object.assign(this, data);
  }

  get promotion_items() {
    return this._promotion_items;
  }

  set promotion_items(value: Array<object> | undefined) {
    this._promotion_items = value ? value.map(el => new PromotionItem(el)) : undefined;
  }
}
