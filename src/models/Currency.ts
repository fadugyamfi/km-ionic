import { NullableNumber, NullableString, NullableStringOrNumber } from "../utilities/Types";

export default class Currency {

    public id: NullableStringOrNumber = null;
    public name: NullableString = null;
    public symbol: NullableString = null;

    constructor(data: object) {
        Object.assign(this, data);
    }
}
