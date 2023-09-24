

export default class ProductCategory {

    public id?: number;
    public name?: string;
    public description?: string;
    public created_at?: string;
    public updated_at?: string;
    public image?: string


    constructor(data: object) {
        Object.assign(this, data);
    }
}
