import PromotionItem from "./PromotionItem";

export default class Promotion {
  public id?: number | string;
  public name?: string;
  public position?: number;
  public promotion_items?: PromotionItem[];

  constructor(data: object) {
    Object.assign(this, data);
  }
}
