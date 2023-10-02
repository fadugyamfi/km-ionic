

export default class Brand {

    public id?: number;
    public name?: string;
    public description?: string;
    public created_at?: string;
    public updated_at?: string;
    public logo?: string


    constructor(data: object) {
        Object.assign(this, data);
    }
}
