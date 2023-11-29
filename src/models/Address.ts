
export default class Agent {
  public business_id?: number;
  public address?: string;
  public country_id?: number;
  public state_id?: string;
  public city?: number;

  constructor(data: Object) {
    Object.assign(this, data);
  
}
}