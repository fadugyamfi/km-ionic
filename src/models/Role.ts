import Permission from "./Permission";

export default class Role {
  public business_id?: number;
  public id?: number;
  public name?: string;
  public permissions?: Permission[];

  constructor(data: object | null) {
    Object.assign(this, data);
  }

  // user role
  isSalesAssociate() {
    return [5].indexOf(this.id as number) > -1;
  }

  isSuperAdmin() {
    return this.id == 1;
  }

  isSaleAgent() {
    return this.id == 5;
  }

  isSalesManager() {
    return this.id == 2; // Sales Manager
  }

  isOwner() {
    return this.id == 4; // Owner
  }
}
