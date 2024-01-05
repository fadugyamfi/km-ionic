

export default class ProductCategory {

    public id?: number;
    public name?: string;
    public description?: string;
    public created_at?: string;
    public updated_at?: string;
    public _image?: string


    constructor(data: object) {
        Object.assign(this, data);
    }

    get image(): string | undefined {
        const parts = this._image?.split('/');
        const filename = parts ? parts[parts?.length - 1] : null;

        if( filename ) {
            return `/img/product_categories/${filename}`;
        }

        return this._image;
    }

    set image(value: string) {
        this._image = value;
    }
}
