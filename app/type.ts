export type JsonObject = { [key: string]: any };

export type LimitedPartnerDetail = {
    id: string;
    name: string;
    status: string;
    source: string;
    firstClose: Date;
    inactiveDate?: Date;
    reinvestmentEnabled: boolean;
    funds: LimitedPartnerFundDetail[];
    cashFlows: PivotCashflowData[]
    ledger: LedgerDetail[]
    irr: number | string;
}

export type LimitedPartnerFundDetail = {
    name: string;
    firstClose?: Date;
    reinvestmentStart?: Date;
    harvestStart?: Date;
    managementFee: number;
    incentiveFee: number;
    reportedDate: Date;
    commitmentAmountTotal: number;
    capitalCalledTotal: number;
    capitalDistributedTotal: number;
    incomeDistributedTotal: number;
    remainingCapitalTotal: number;
    ledger: LedgerDetail[]
}

export type Cashflow = {
    date: Date;
    amount: number;
    description: string;
}

export type LedgerDetail = {
    entryDate: Date,
    activityDate: Date,
    effectiveDate: Date,
    activity: string,
    subActivity?: string,
    amount: number,
    entityFrom: string,
    entityTo: string,
    relatedEntity: string,
    relatedFund: string
}

export type PivotCashflowData = JsonObject