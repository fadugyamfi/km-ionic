


export default class Region {

    public id?: number | string;
    public name?: string;

    constructor(data: any) {
        Object.assign(this, data);
    }
}
