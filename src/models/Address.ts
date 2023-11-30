import Country from "./Country";
import Business from "./Business";
import {
  NullableNumber,
} from "@/utilities/Types";



export default class Agent {
  public business_id?: number;
  public address?: string | null;
  public country_id: NullableNumber = null;
  public state_id?: string | null;
  public city?: number | null;
  public _business?: Business | null;
  public _country?: Country | null;

  constructor(data: Object) {
    Object.assign(this, data);
  
}
}