import Permission from "./Permission";

export default class Role {
  business_id?: number;
  id?: number;
  name?: string;
  permissions?: Permission[];

  constructor(data: object | null) {
    Object.assign(this, data);
  }
}
