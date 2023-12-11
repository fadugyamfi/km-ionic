import Business from "./Business";
import Currency from "./Currency";
import { PaymentMode } from "./PaymentMode";

export class SalePayment {
  public id?: number | string;
  public businesses_id?: number;
  public payment_modes_id?: number;
  public currencies_id?: number;
  public amount: number = 0;
  public total_sales_price: number = 0;
  public payment_date?: string;

  private _business?: Business | null;
  private _payment_mode?: PaymentMode | null;
  private _currency?: Currency | null;

  constructor(data: object) {
    Object.assign(this, data);
  }

  update(data: object) {
    Object.assign(this, data);
  }

  get business(): Business | null | undefined {
    return this._business;
  }

  set business(value: object) {
    this._business = value ? new Business(value) : null;
  }

  get currency(): Currency | null | undefined {
    return this._currency;
  }

  set currency(value: object) {
    this._currency = value ? new Currency(value) : null;
  }

  get payment_mode(): PaymentMode | null | undefined {
    return this._payment_mode;
  }

  set payment_mode(value: object) {
    this._payment_mode = value ? new PaymentMode(value) : null;
  }
 
}
