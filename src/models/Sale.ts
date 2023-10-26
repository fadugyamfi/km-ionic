import { SaleItem } from './SaleItem';
export class Sale {

    public id?: number | string;
    public businesses_id?: number;
    public cms_users_id?: number;
    public sale_types_id?: number;
    public payment_modes_id?: number;
    public customer_id?: number;
    public credits_id?: number;
    public gps_location?: string;
    public delivery_location?: string;
    public product_units_id?: number;
    public sale_started_at?: string;
    public sale_ended_at?: string;
    public total_items?: number = 0;
    public total_sales_price?: number = 0;
    public total_discount?: number = 0;
    public created_at?: string;

    public items?: SaleItem[] = [];

    constructor(data: object) {
        Object.assign(this, data);
    }
}
