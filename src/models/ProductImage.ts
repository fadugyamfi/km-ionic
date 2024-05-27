export default class ProductImage {
  public id?: number;
  public image?: string;
  public image_path?: string;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
