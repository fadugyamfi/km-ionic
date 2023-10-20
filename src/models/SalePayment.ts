export class SalePayment {

    public id?: number | string;
    public businesses_id?: number;

    constructor(data: object) {
        Object.assign(this, data);
    }
}
