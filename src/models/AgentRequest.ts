import Agent from "./Agent";

export default class AgentRequest {
  public id?: number | string;
  public created_at?: string;
  public name?: string;
  public email?: string;
  public agent_request_items_count?: number | string;
  public total_sales_price?: number | string;
  public agent_request_items?: any[] | null;
  public description?: string;
  public photo?: string;
  public sale_agent?: Agent;

  constructor(data: Object) {
    Object.assign(this, data);
  }
}
