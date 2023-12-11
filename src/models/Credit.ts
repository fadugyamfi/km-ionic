import Customer from "@/models/Customer";
import Business from "@/models/Business";
import { Order } from "@/models/Order";

export default class Credit {
  public id?: number | string;
  public businesses_id?: number | string;
  public created_at?: string;
  public customer?: Customer;
  public total_sales_price: number = 0;
  public business?: Business;
  public sale_items?: any[];
  public sale_ended_at?: string;
  public sale_payments_sum_amount: number = 0;
  public display_label?: string;
  public _order?: Order;

  constructor(data: object | null) {
    Object.assign(this, data);
  }

  isPaid() {
    return this.sale_payments_sum_amount >= this.total_sales_price;
  }

  get order(): Order | undefined {
    return this._order;
  }

  set order(value: object) {
    this._order = new Order(value);
  }
}
