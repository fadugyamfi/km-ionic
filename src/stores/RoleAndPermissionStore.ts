import { handleAxiosRequestError } from "@/utilities";
import axios from "axios";
import { defineStore } from "pinia";

export const useRoleAndPermissionStore = defineStore("roleAndPermission", {
  state: () => ({
    roles: [],
    groupedPermissions: [],
    groupedAllPermissions: [],
  }),

  actions: {
    async fetchRoles(business_id: number) {
      try {
        const response = await axios.get("/v2/roles", {
          params: {
            business_id,
          },
        });
        this.roles = response.data.data;
        return this.roles;
      } catch (error) {
        handleAxiosRequestError(error);
      }
    },
    async fetchAllPermissions(options: object) {
      try {
        const params = {
          ...options,
        };
        const response = await axios.get(`/v2/permissions`, {
          params,
        });
        this.groupedAllPermissions = response.data.data;
        return this.groupedAllPermissions;
      } catch (error) {
        handleAxiosRequestError(error);
      }
    },
    async fetchRolePermissions(role_id: number, options: object) {
      try {
        const params = {
          ...options,
        };
        const response = await axios.get(`/v2/roles/${role_id}/permissions`, {
          params,
        });
        this.groupedPermissions = response.data.data;
        return this.groupedPermissions;
      } catch (error) {
        handleAxiosRequestError(error);
      }
    },
    async createRole(form: Object) {
      try {
        const res = await axios.post("/v2/roles", form);
        const newRole = res.data.data;
        this.roles.unshift(newRole);
        return newRole;
      } catch (error) {
        handleAxiosRequestError(error);
      }
    },
    async assignRole(form: Object) {
      try {
        const { user_id } = form;
        const res = await axios.post(`/v2/users/${user_id}/businesses`, form);
        return res;
      } catch (error) {
        handleAxiosRequestError(error);
      }
    },
  },
});
