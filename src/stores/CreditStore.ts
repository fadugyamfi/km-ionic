import { defineStore } from "pinia";
import axios from "axios";
import { handleAxiosRequestError } from "@/utilities";
import { useUserStore } from "./UserStore";

const userStore = useUserStore();
export const useCreditStore = defineStore("credit", {
  state: () => {
    return {
      credits: [],
    };
  },
  actions: {
    async getCredits(options = {}): Promise<any[] | null> {
      try {
        const params = {
          businesses_id: userStore.activeBusiness?.id,
          cms_users_id: userStore.user?.id,
          ...options,
        };
        const response = await axios.get("v2/sales?sale_types_id=5", {
          params,
        });
        this.credits = response.data.data;
        return this.credits;
      } catch (error) {
        handleAxiosRequestError(error);
        return null;
      }
    },
    async deleteCredit(id: string | number) {
      try {
        const params = {
          businesses_id: userStore.activeBusiness?.id,
          cms_users_id: userStore.user?.id,
        };
        await axios.delete(`v2/sales?sale_types_id=5/${id}`, {
          params,
        });
      } catch (error) {
        handleAxiosRequestError(error);
        return null;
      }
    },
  },
});
