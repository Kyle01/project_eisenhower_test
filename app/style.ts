import { formatNumberToCurrency } from "./utils";

export const sharedColumnDefs = {
    date: {
        filter: true,
        valueFormatter: (params: any) => {
            return params.value ? new Date(params.value).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'}) : '-';
        },
        cellClass: 'text-right',
        headerClass: 'text-right',
        width: 125,
    },
    money: {
        filter: true,
        valueFormatter: (params: any) => {
            return params.value ? formatNumberToCurrency(params.value) : '-';
        },
        cellClass: 'text-right',
        headerClass: 'text-right',
        width: 125,
    },
    moneyNoDecimals: {
        filter: true,
        valueFormatter: (params: any) => {
            return params.value ? formatNumberToCurrency(params.value, 0) : '-';
        },
        cellClass: 'text-right',
        headerClass: 'text-right',
        width: 125,
    }
}