

export class OrderStatusHistory {

    public id?: number | string;
    public order_id?: number;
    public businesses_id?: number;
    public cms_users_id?: number;
    public order_status_id?: number;
    public comment?: string;
    public created_at?: string;

    constructor(data: object) {
        Object.assign(this, data);
    }

    update(data: object) {
        Object.assign(this, data);
    }

}
