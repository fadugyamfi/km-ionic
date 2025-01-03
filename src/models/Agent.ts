import Team from "./Team";

export default class Agent {
  public id_cms_privileges?: number;
  public phone_number?: string;
  public name?: string;
  public parent_users_id?: number;
  public location?: string;
  public id?: number;
  public role?: any;
  public image?: string;
  public photo?: string;
  public email?: string;
  public total_customers?: number;
  public top_selling_product?: object;
  public avg_sales?: number;
  public total_sales?: number;
  public latest_target_percentage_complete?: number;
  public teams: Team[] = []

  constructor(data: Object) {
    Object.assign(this, data);
  }

  firstName() {
    return this.name?.split(" ")[0];
  }

  isSuperAdmin() {
    return this.id_cms_privileges == 1;
  }

  isSaleAgent() {
    return this.id_cms_privileges == 5;
  }

  isSalesManager() {
    return this.id_cms_privileges == 2; // Sales Manager
  }

  isOwner() {
    return this.id_cms_privileges == 4; // Owner
  }
}
