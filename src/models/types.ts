export type Favorited = {
    id?: number | null;
    cms_users_id?: number | null;
    favoritable_id: number;
    favoritable_type: string;
    created_at?: string;
    updated_at?: string
    deleted_at?: string | null;
}

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

export type ChangeStatusRequest = {
    cms_users_id: number;
    businesses_id: number;
    order_id: number,
    order_status_id: number,
    comment: string
}

export type WeightUnit = {
    id?: number;
    name: string;
    symbol: string;
    created_at?: string | null;
    updated_at?: string | null;
    deleted_at?: string | null;
}

export type VolumeUnit = {
    id?: number;
    name: string;
    symbol: string;
    created_at?: string | null;
    updated_at?: string | null;
    deleted_at?: string | null;
}
