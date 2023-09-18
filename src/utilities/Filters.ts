import {
    formatCurrency,
    formatDate,
    formatDateForInput,
    formatDateRange,
    formatDateTime,
    formatDateTimeForInput,
    formatShortDate,
    formatShortDateTime,
    relativeTime
} from "./Date";
import { formatCompactNumber, formatNumber } from "./Number";

export default {

    currency(value:number, symbol = 'GHS', display = 'code') {
        return formatCurrency(value, symbol, display);
    },

    number(value: number, decimals = 0, type:string) {
        if (type == 'compact') {
            return formatCompactNumber(value, decimals);
        }

        return formatNumber(value, decimals);
    },

    date(value:string, type:string, style = null) {
        if (type == 'short') {
            return formatShortDate(value);
        }

        if (type == 'input') {
            return formatDateForInput(value);
        }

        if (type == 'relative') {
            return relativeTime(value, style ? style : 'short');
        }

        return formatDate(value);
    },

    datetime(value: string, type: string) {
        if (type == 'short') {
            return formatShortDateTime(value);
        }

        if (type == 'input') {
            return formatDateTimeForInput(value);
        }

        return formatDateTime(value);
    },

    daterange(start: string, end: string) {
        return formatDateRange(start, end);
    }

}
