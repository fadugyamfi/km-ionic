const CASH_ORDER = 1;
const CREDIT_ORDER = 2;

export const OrderTypes = {
    CASH_ORDER,
    CREDIT_ORDER
}

export class OrderType {

    public id?: number | string;
    public name?: number;
    public description?: string;

    constructor(data: object) {
        Object.assign(this, data);
    }
}
