

export type LimitedPartnerDetail = {
    id: string;
    name: string;
    status: string;
    source: string;
    firstClose: Date;
    inactiveDate?: Date;
    reinvestmentEnabled: boolean;
    funds: LimitedPartnerFundDetail[];
}

export type LimitedPartnerFundDetail = {
    firstClose: Date;
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
    irr: number;
    cashFlows: Cashflow[]
    ledger: LedgerDetail[]
}

export type Cashflow = {
    date: Date;
    cashflow: number;
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