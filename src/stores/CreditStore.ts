import { defineStore } from "pinia";
import axios from "axios";
import { handleAxiosRequestError } from "@/utilities";
import { useUserStore } from "./UserStore";
import { business } from "ionicons/icons";
import { useToastStore } from "./ToastStore";
import Credit from "@/models/Credit";
import { SalePayment } from "@/models/SalePayment";
const userStore = useUserStore();
const toastStore = useToastStore();
export const useCreditStore = defineStore("credit", {
  state: () => {
    return {
      credits: [] as Credit[] | null,
      credit: {} as Credit | null,
      creditSummary: {},
      recordedRepayments: [] as SalePayment[] | null,
    };
  },
  actions: {
    async getCredits(options = {}): Promise<Credit[] | null> {
      try {
        const params = {
          businesses_id: userStore.activeBusiness?.id,
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
    async getCredit(id: number | string) {
      try {
        const response = await axios.get(`v2/sales/${id}`);
        const credit = new Credit(response.data.data);
        console.log(credit);
        return credit;
      } catch (error) {
        handleAxiosRequestError(error);
        return null;
      }
    },
    async getCreditSummary(options = {}): Promise<any | null> {
      try {
        const business = userStore.activeBusiness;
        const params = {
          ...options,
        };
        const response = await axios.get(
          `v2/businesses/${business?.id}/summary`,
          { params }
        );
        this.creditSummary = response.data.data;
        return this.creditSummary;
      } catch (error) {
        handleAxiosRequestError(error);
        return null;
      }
    },
    async deleteCredit(id: string | number) {
      if (!this.credits) {
        return;
      }

      try {
        await axios.delete(`v2/sales/${id}`);
        this.credits = this.credits.filter(
          (credit: Credit) => credit.id !== id
        );
        toastStore.showSuccess("Credit deleted successfully");
      } catch (error) {
        handleAxiosRequestError(error);
        toastStore.showError("Failed to delete credit");
        return null;
      }
    },
    async getRecordedRepayments(
      business_id: string | number,
      sales_id: string | number
    ): Promise<SalePayment[] | null> {
      try {
        const params = {
          businesses_id: business_id,
          sales_id,
        };
        const response = await axios.get("v2/sale-payments", { params });
        this.recordedRepayments = response.data.data.map(
          (item: any) => new SalePayment(item)
        );
        return this.recordedRepayments;
      } catch (error) {
        handleAxiosRequestError(error);
        return null;
      }
    },
  },
});
