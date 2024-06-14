import { handleAxiosRequestError } from "@/utilities";
import axios from "axios";
import { defineStore } from "pinia";
import { useUserStore } from "./UserStore";
import Business from "@/models/Business";
import Team from "@/models/Team";
import AppStorage from "./AppStorage";
import Agent from "@/models/Agent";

const userStore = useUserStore();
const storage = new AppStorage();

export const useTeamStore = defineStore("team", {
  state: () => ({
    teamMembers: [] as Agent[],
    member: null as Agent | null,
  }),

  actions: {
    async fetchTeamMembers(
      business: Business,
      limit: number = 50,
      options = {},
      refresh = false
    ): Promise<Agent[]> {
      const cacheKey = `kola.business.${business.id}.sale-agents`;

      // if ((await storage.has(cacheKey)) && !refresh) {
      //   const data = await storage.get(cacheKey);
      //   this.teamMembers = data.map((el: object) => new Agent(el));
      //   return this.teamMembers;
      // }

      try {
        const params = {
          businesses_id: business.id,
          limit,
          sort: "name:asc",
          ...options,
        };

        const response = await axios.get(`/v2/sale-agents`, { params });
        const teamMembers: Agent[] = response.data.data.map(
          (el: any) => new Agent(el)
        );
        await storage.set(cacheKey, teamMembers, 7, "days");
        this.teamMembers = teamMembers;
        return teamMembers;
      } catch (error) {
        handleAxiosRequestError(error);
      }

      return [];
    },
    async getTeamMember(
      business: Business,
      member_id: any,
      options: Object,
      refresh = false
    ): Promise<Agent | null> {
      try {
        const params = {
          businesses_id: business.id,
          ...options,
        };
        if (!refresh) {
          const member = this.teamMembers.find(
            (member) => member.id === member_id
          );
          if (member) {
            this.member = new Agent(member);
            return this.member;
          }
        }
        const response = await axios.get(`/v2/sale-agents/${member_id}`, {
          params,
        });
        if (response) {
          const member = response.data.data;
          this.member = new Agent(member);
          return this.member;
        }
        return null;
      } catch (error) {
        handleAxiosRequestError(error);
        return null;
      }
    },
    async updateMemberDetails(memberId: number, form: object) {
      try {
        const res = await axios.put(`/v2/users/${memberId}`, form);
        if (res) {
          return res.data.data;
        }
      } catch (error) {
        handleAxiosRequestError(error);
      }
    },
    async removeTeamMember(memberId: number) {
      try {
        const cacheKey = `kola.business.${userStore.activeBusiness?.id}.sale-agents`;
        const res = await axios.delete(
          `/v2/users/${memberId}/businesses/${userStore?.activeBusiness?.id}`
        );
        if (res) {
          this.teamMembers = this.teamMembers.filter(
            (member) => member.id !== res.data.data?.user_id
          );
          await storage.set(cacheKey, this.teamMembers, 7, "days");
        }
      } catch (error) {
        throw new Error();
      }
    },
    async addTeamMember(form: any): Promise<Agent | null> {
      try {
        const { businesses_id } = form;
        const cacheKey = `kola.business.${businesses_id}.sale-agents`;
        const response = await axios.post("/v2/sale-agents", form);
        if (response) {
          const newMember = new Agent(response.data.data);
          this.teamMembers.unshift(newMember);
          await storage.set(cacheKey, this.teamMembers, 7, "days");
          return newMember;
        }
        return null;
      } catch (error) {
        handleAxiosRequestError(error);
        return null;
      }
    },
  },
});
