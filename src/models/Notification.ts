import { Order } from "./Order";

export default class Notification {

    public id: number | null = null;
    public title: string | null = null;
    public content: string | null = null;
    public type: string | null = null;
    public type_id: number | null = null;
    public category: string | null = null;
    public created_at: string | null = null;
    public notifiable: object | null = null;

    public _order: Order | null = null;

    constructor(data: object) {
        Object.assign(this, data)
    }

    get order(): Order | null
    {
        return this._order;
    }

    set order(value: object) {
        this._order = value ? new Order(value) : null;
    }
};
