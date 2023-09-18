export const formatNumber = (value:number, decimals = 2) => {
    return new Intl.NumberFormat("en", {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
    }).format(value);
};

export const formatCompactNumber = (value:number, decimals = 2) => {
    return new Intl.NumberFormat("en", {
        notation: "compact",
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
    }).format(value);
};

export const formatAmountWithCommas = (amount:number) => {
    return (
        amount &&
        Number(amount)
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
};
