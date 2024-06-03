interface Pivot {
  permission_id: number;
  role_id: number;
}

export default class Permission {
  id?: number;
  description?: string | null;
  group_name?: string;
  name?: string;
  pivot?: Pivot;

  constructor(data: object | null) {
    Object.assign(this, data);
  }
}
