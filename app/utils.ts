
export const excelDateToJSDate = (excelDate: number): Date => {
    return new Date(Math.round((excelDate - 25569) * 86400 * 1000));
}

export const formatNumberToPercentage = (number: number): string => {
    return (number * 100).toFixed(2) + '%';
}

export const formatNumberToCurrency = (number: number, decimals: number = 2): string => {
    return number.toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: decimals, maximumFractionDigits: decimals});
}