import Business from "./Business";
import Role from "./Role";

export default class Team {
  public business?: Business;
  public businesses_id?: number;
  public role?: Role | null;
  public id?: number;
  public role_id?: number;
  public user_id?: number;

  constructor(data: object | null) {
    Object.assign(this, data);
  }
}
