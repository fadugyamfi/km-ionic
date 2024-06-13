import { handleAxiosRequestError } from "@/utilities";
import axios from "axios";
import { defineStore } from "pinia";

export const useTeamStore = defineStore("team", {
  state: () => ({
    teamMembers: [],
    member: {},
  }),

  actions: {
    async updateMemberDetails(memberId: number, form) {
      try {
        const res = await axios.put(`/v2/users/${memberId}`, form);
      } catch (error) {
        handleAxiosRequestError(error);
      }
    },
  },
});
