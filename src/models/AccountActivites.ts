import {
  NullableNumber,
} from "@/utilities/Types";


export default class Address {
  public id?: number;
  public log_name?: string | null;
  public description?: string | null;
  public event: NullableNumber = null;
  public subject_id?: number | null;
  public causer_type?: number | null;
  public properties?: string | null;
  public batch_uuid?: string | null;

  constructor(data: Object) {
    Object.assign(this, data);
  
}
}