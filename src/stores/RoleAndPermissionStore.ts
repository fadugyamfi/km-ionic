import { GroupedPermission } from "@/models/Permission";
import Role from "@/models/Role";
import { handleAxiosRequestError } from "@/utilities";
import axios from "axios";
import { defineStore } from "pinia";
import { useUserStore } from "./UserStore";

export const useRoleAndPermissionStore = defineStore("roleAndPermission", {
  state: () => ({
    roles: [] as Role[],
    groupedPermissions: [] as GroupedPermission[],
    groupedAllPermissions: [] as GroupedPermission[],
  }),

  actions: {
    async fetchRoles(business_id: number) {
      try {
        const response = await axios.get("/v2/roles", {
          params: {
            business_id,
          },
        });
        this.roles = response.data.data.map((role: Role) => new Role(role));
        return this.roles;
      } catch (error) {
        handleAxiosRequestError(error);
      }
    },
    async fetchAllPermissions(options: object): Promise<GroupedPermission[]> {
      try {
        const params = {
          ...options,
        };
        const response = await axios.get(`/v2/permissions`, {
          params,
        });
        this.groupedAllPermissions = response.data.data.map(
          (group: GroupedPermission) => new GroupedPermission(group)
        );
        return this.groupedAllPermissions;
      } catch (error) {
        handleAxiosRequestError(error);
        return [];
      }
    },
    async fetchRolePermissions(
      role_id: number,
      options: object
    ): Promise<GroupedPermission[]> {
      try {
        const params = {
          ...options,
        };
        const response = await axios.get(`/v2/roles/${role_id}/permissions`, {
          params,
        });
        this.groupedPermissions = response.data.data.map(
          (group: GroupedPermission) => new GroupedPermission(group)
        );
        return this.groupedPermissions;
      } catch (error) {
        handleAxiosRequestError(error);
        return [];
      }
    },
    async createRole(form: Object) {
      try {
        const res = await axios.post("/v2/roles", form);
        const newRole = new Role(res.data.data);
        this.roles.unshift(newRole);
        return newRole;
      } catch (error) {
        handleAxiosRequestError(error);
      }
    },
    async assignRole(form: any) {
      try {
        const { user_id, businesses_id } = form;
        const res = await axios.put(
          `/v2/users/${user_id}/businesses/${businesses_id}`,
          form
        );
        return res;
      } catch (error) {
        handleAxiosRequestError(error);
      }
    },
  },
});
