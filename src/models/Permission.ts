interface Pivot {
  permission_id: number;
  role_id: number;
}

export default class Permission {
  public id?: number;
  public description?: string | null;
  public group_name?: string;
  public name?: string;
  public pivot?: Pivot;

  constructor(data: object | null) {
    Object.assign(this, data);
  }
}
