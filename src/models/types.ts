
export type FavoritedProduct = {
    id?: number | null;
    cms_users_id?: number | null;
    products_id: number;
    created_at?: string;
    updated_at?: string
    deleted_at?: string | null;
}

export type FavoritedBrand = {
    id?: number | null;
    cms_users_id?: number | null;
    brands_id: number;
    created_at?: string;
    updated_at?: string
    deleted_at?: string | null;
}
export type FavoritedBusiness = {
    id?: number | null;
    cms_users_id?: number | null;
    businesses_id: number;
    created_at?: string;
    updated_at?: string
    deleted_at?: string | null;
}
