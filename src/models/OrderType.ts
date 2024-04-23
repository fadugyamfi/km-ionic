const CASH_SALE = 1;
const CREDIT_SALE = 5;

export const OrderTypes = {
    CASH_SALE,
    CREDIT_SALE
}

export class OrderType {

    public id?: number | string;
    public name?: number;
    public description?: string;

    constructor(data: object) {
        Object.assign(this, data);
    }
}
