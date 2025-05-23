
export const excelDateToJSDate = (excelDate: number): Date => {
    return new Date(Math.round((excelDate - 25569) * 86400 * 1000));
}

export const jsDateToExcelDate = (date: Date) => {
    const excelEpoch = new Date(Date.UTC(1899, 11, 30)); // Dec 30, 1899
    const msPerDay = 24 * 60 * 60 * 1000;
    const diffInDays = (date.getTime() - excelEpoch.getTime()) / msPerDay;

    return diffInDays;
  }

export const formatNumberToPercentage = (number: number): string => {
    return (number * 100).toFixed(2) + '%';
}

export const formatNumberToCurrency = (number: number, decimals: number = 2): string => {
    return number.toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: decimals, maximumFractionDigits: decimals});
}
export const formatNumberToCurrencyMillions = (number?: number, decimals: number = 1): string => {
    if (!number) return '-';
    return `${(number / 1000000).toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: decimals, maximumFractionDigits: decimals})}M`;
}