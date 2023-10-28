export class SaleType {

    public id?: number | string;
    public name?: number;
    public description?: string;

    constructor(data: object) {
        Object.assign(this, data);
    }
}
