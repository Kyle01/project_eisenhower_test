
export const excelDateToJSDate = (excelDate: number): Date => {
    return new Date(Math.round((excelDate - 25569) * 86400 * 1000));
}