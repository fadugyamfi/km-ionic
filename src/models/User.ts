export default class User {
  public id_cms_privileges?: number;
  public phone_number?: string;
  public name?: string;
  public parent_users_id?: number;
  public location?: string;
  public id?: number;
  public role?: any;
  public image?: string;
  public photo?: string;
  public photo_url?: string;
  public email?: string;

  constructor(data: Object) {
    Object.assign(this, data);
  }

  firstName() {
    return this.name?.split(" ")[0];
  }

  // isSuperAdmin() {
  //   return this.id_cms_privileges == 1;
  // }

  // isSaleAgent() {
  //   return this.id_cms_privileges == 5;
  // }

  // isSalesManager() {
  //   return this.id_cms_privileges == 2; // Sales Manager
  // }

  // isOwner() {
  //   return this.id_cms_privileges == 4; // Owner
  // }

  // isSalesAssociate() {
  //   return [2, 5].indexOf(this.id_cms_privileges as number) > -1;
  // }
}
