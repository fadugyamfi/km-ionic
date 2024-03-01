import Agent from "./Agent";
import { OrderItem } from "./OrderItem";

export default class AgentRequest {
  public id?: number | string;
  public created_at?: string;
  public name?: string;
  public email?: string;
  public agent_request_items_count?: number | string;
  public total_price?: number | string;
  public agent_request_items?: any[] | null;
  public description?: string;
  public photo?: string;
  public sale_agent?: Agent;
  public customer_id?: number;
  public items?: OrderItem[];
  public cms_users_id?: string | number;
  public total_items?: number;
  public uuid?: string;
  public approved_by?: number;
  public approved_at?: string;

  constructor(data: Object) {
    this.update(data);
  }

  update(data: object) {
    Object.assign(this, data);
  }
}
