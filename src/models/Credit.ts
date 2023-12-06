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
  public order?: Order;
  public sale_payments_sum_amount: number = 0;

  constructor(data: object | null) {
    Object.assign(this, data);
  }
  isPaid() {
    return this.sale_payments_sum_amount >= this.total_sales_price;
  }
}
