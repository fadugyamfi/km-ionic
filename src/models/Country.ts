


export default class Country {

    public id?: number | string;
    public name?: string;

    constructor(data: any) {
        Object.assign(this, data);
    }
}
