export class InventoryType {
  public id?: number | string;
  public name?: number;
  public description?: string;
  public icon?: string;

  constructor(data: object) {
    Object.assign(this, data);
  }
}
