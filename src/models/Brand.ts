import { FavoritedBrand } from "./types";

export default class Brand {

    public id?: number;
    public name?: string;
    public description?: string;
    public created_at?: string;
    public updated_at?: string;
    public logo?: string
    public favorited?: FavoritedBrand | null;


    constructor(data: object) {
        Object.assign(this, data);
    }

    addToFavorites(favorited?: FavoritedBrand) {
        this.favorited = favorited || {
            brands_id: this.id as number
        };
    }

    unfavorite() {
        this.favorited = null;
    }

    getInitials(length: number = 3) {
        return this.name?.split(" ").map((n)=>n[0]).join("").toUpperCase().substring(0, length);
    }
}
