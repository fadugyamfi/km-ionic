import axios from "axios";
import { defineStore } from "pinia";
import { useUserStore } from "./UserStore";
import { Favorited } from "../models/types";

export const useFavoritesStore = defineStore('favorites', {

    state: () => ({
        favorites: [] as Favorited[],
        fetching: false
    }),

    actions: {

        async fetchFavorites() {
            const userStore = useUserStore();
            this.fetching = true;

            return axios.get(`/v2/users/${userStore.user?.id}/favorites`)
                .then(response => {
                    this.favorites = response.data.data;
                })
                .finally(() => this.fetching = false);
        },

        getFavoriteBrands() {
            return this.favorites.filter((favorite) => favorite.favoritable_type?.includes('Brand'));
        },

        getFavoriteProducts() {
            return this.favorites.filter((favorite) => favorite.favoritable_type?.includes('Product'));
        },

        getFavoriteBusinesses() {
            return this.favorites.filter((favorite) => favorite.favoritable_type?.includes('Business'));
        },
    }
});
