export default class TopPerformingAgent {
  public name?: string;
  public cms_users_id?: number;
  public total_sales?: number;
  public total_sales_value?: number;
  public photo?: string;

  constructor(data: Object) {
    Object.assign(this, data);
  }
}
