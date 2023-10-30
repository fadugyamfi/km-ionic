const CASH_SALE = 1;
const CREDIT_SALE = 5;

export const SaleTypes = {
    CASH_SALE,
    CREDIT_SALE
}

export class SaleType {

    public id?: number | string;
    public name?: number;
    public description?: string;

    constructor(data: object) {
        Object.assign(this, data);
    }
}
