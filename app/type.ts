

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
}

export type Cashflow = {
    date: Date;
    cashflow: number;
}
