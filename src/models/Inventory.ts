export default class Inventory {
  public id?: number | string;
  public name?: number;

  constructor(data: object) {
    Object.assign(this, data);
  }
}
