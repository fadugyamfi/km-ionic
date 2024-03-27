/*
order_status_id
 1 = Pending
 2 = Pre-Approved
 3 = Approved
 4 = Partially paid
 5 = Paid
 6 = Out for delivery
 7 = Delivered
 8 = Cancelled
 9 = Rejected
 10 = Refunded
*/
import Business from "./Business";
import Currency from "./Currency";
import { OrderItem } from "./OrderItem";
import { OrderStatusHistory } from "./OrderStatusHistory";
import { Sale } from "./Sale";
import { SalePayment } from "./SalePayment";
import { SaleTypes } from "./SaleType";

export enum OrderStatus {
  PENDING = 1,
  PREAPPROVED = 2,
  APPROVED = 3,
  PARTIALLY_PAID = 4,
  PAID = 5,
  OUT_FOR_DELIVERY = 6,
  DELIVERED = 7,
  CANCELLED = 8,
  REJECTED = 9,
  REFUNDED = 10,
}

export class Order {
  public id?: number | string;
  public order_no?: string;
  public ordered_at?: string;
  public businesses_id?: number;
  public cms_users_id?: number | string;
  public customer_id?: number;
  public total_order_amount?: number | string;
  public order_status_id?: number;
  public payment_modes_id?: number;
  public order_started_at?: string;
  public order_ended_at?: string;
  public total_items?: string | number;
  public uuid?: string;

  public created_at: any;
  public order_status: any;
  public start_dt: string | number | Date | undefined;
  public product_units_id?: number;
  public delivery_location?: string;
  public delivery_date?: string;
  public payment_option_id?: number;
  public days_overdue?: number | string;
  public due_date?: number | string;
  public order_items_count = 0;
  public total_amount_recovered = 0;
  public total_sales_amount = 0;
  public sale_payments?: SalePayment[];

  public _order_status_histories: OrderStatusHistory[] = [];
  public _order_items: OrderItem[] = [];
  public _customer?: Business;
  public _business?: Business;
  public _currency?: Currency;

  constructor(data: object) {
    this.update(data);
  }

  update(data: object) {
    Object.assign(this, data);
  }

  getTotal() {
    return this.order_items.reduce(
      (acc, value) => acc + (value.total_price || 0),
      0
    );
  }

  get order_items(): OrderItem[] {
    return this._order_items;
  }

  set order_items(items: object[]) {
    this._order_items = items ? items.map((item) => new OrderItem(item)) : [];
  }

  get customer(): Business | undefined {
    return this._customer;
  }

  set customer(value: object) {
    this._customer = new Business(value || {});
  }

  get business(): Business | undefined {
    return this._business;
  }

  set business(value: object) {
    this._business = new Business(value || {});
  }

  get order_status_histories(): OrderStatusHistory[] {
    return this._order_status_histories;
  }

  set order_status_histories(history: object[]) {
    this._order_status_histories = history?.map(
      (h) => new OrderStatusHistory(h)
    );
  }

  get currency(): Currency | undefined {
    return this._currency;
  }

  set currency(value: object) {
    this._currency = new Currency(value || {});
  }

  getLastOrderStatusHistory(
    orderStatusId: number
  ): OrderStatusHistory | undefined {
    return this.order_status_histories.find(
      (h) => h.order_status_id == orderStatusId
    );
  }

  isPendingApproval() {
    return this.order_status_id == 1;
  }

  isApproved() {
    return [3, 4, 5, 6, 7].indexOf(this.order_status_id as number) > -1;
  }

  isCancelled() {
    return [8].indexOf(this.order_status_id as number) > -1;
  }

  isRejected() {
    return this.order_status_id == 9;
  }

  isOutForDelivery() {
    return this.order_status_id == OrderStatus.OUT_FOR_DELIVERY;
  }

  isDelivered() {
    return this.order_status_id == OrderStatus.DELIVERED;
  }

  isPayNow() {
    return this.payment_option_id == 1;
  }
  amountOwed() {
    if (!this.isPayNow()) {
      return false;
    }

    if (!this.total_amount_recovered && this.total_order_amount) {
      return true;
    }

    return (
      (this.total_amount_recovered as number) <
      (this.total_order_amount as number)
    );
  }
}
