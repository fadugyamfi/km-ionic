export function formatDateTime(value: string) {
    const options:any = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric'
    };
    const date = new Date(value);

    return date.toLocaleString('en', options);
};

export function formatShortDateTime(value:string) {
    const options:any = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric'
    };
    const date = new Date(value);

    return date.toLocaleString('en', options);
};


export function formatDate(value:string) {
    const options:any = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    const date = new Date(value);

    return date.toLocaleDateString('en', options);
};

export function formatShortDate(value:string) {
    const options:any = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    };
    const date = new Date(value);

    return date.toLocaleDateString('en', options);
};

export function formatDateISO(value:string) {
    const date = new Date(value);

    const month = date.getMonth() + 1 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    return `${date.getFullYear()}-${month}-${day}`;
}

export function formatDateMySQL(value:string) {
    return formatDateISO(value);
}

export function formatCurrency(value: number, symbol = 'GHS', display = 'code') {
    return new Intl.NumberFormat('en-GH', {
        style: 'currency',
        currency: symbol,
        currencyDisplay: display
    }).format(value);
}

export function formatDateTimeForInput(value:string) {
    const date = new Date(value);
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const dateOfMonth = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

    return `${date.getFullYear()}-${month}-${dateOfMonth}T${hours}:${minutes}`;
}

export function formatDateForInput(value:string) {
    const date = new Date(value);
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const dateOfMonth = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

    return `${date.getFullYear()}-${month}-${dateOfMonth}`;
}

export function getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 1);
}

export const getLastDayOfMonth = (year:number, month:number) => {
    return new Date(year, month + 1, 0);
}

export function formatDateRange(start_date:string, end_date:string) {
    const format = new Intl.DateTimeFormat("en", {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    const startDate = new Date(formatDateISO(start_date));
    const endDate = new Date(formatDateISO(end_date));

    return format.formatRange(startDate, endDate);
}

export function relativeTime(value: string, style: Intl.RelativeTimeFormatStyle = 'long') {
    const formatter = new Intl.RelativeTimeFormat(undefined, {
        numeric: 'auto',
        style: style
    })

    const DIVISIONS: {
        amount: number;
        name: Intl.RelativeTimeFormatUnit;
    }[] = [
        { amount: 60, name: 'seconds' },
        { amount: 60, name: 'minutes' },
        { amount: 24, name: 'hours' },
        { amount: 7, name: 'days' },
        { amount: 4.34524, name: 'weeks' },
        { amount: 12, name: 'months' },
        { amount: Number.POSITIVE_INFINITY, name: 'years' }
    ]

    function formatTimeAgo(date: number) {
        let duration = (date - new Date().getTime()) / 1000

        for (let i = 0; i < DIVISIONS.length; i++) {
            const division = DIVISIONS[i]
            if (Math.abs(duration) < division.amount) {
                return formatter.format(Math.round(duration), division.name)
            }
            duration /= division.amount
        }
    }

    return formatTimeAgo( Date.parse(value) );
}
