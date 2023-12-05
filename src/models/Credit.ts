import Customer from "@/models/Customer.ts";
import Business from "@/models/Business.ts";
import Order from "@/models/Order.ts";

export default class Credit {
  public id?: number | string;
  public businesses_id?: number | string;
  public created_at?: string;
  public customer?: Customer;
  public total_sales_price?: number | string;
  public business?: Business;
  public sale_items?: any[];
  public sale_ended_at?: string;
  public order?: Order;


  constructor(data: object | null) {
    Object.assign(this, data);
  }
}
