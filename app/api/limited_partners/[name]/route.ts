import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { promises as fs } from 'fs';
import path from 'path';
import { excelDateToJSDate } from '@/app/utils';
import { LedgerDetail } from '@/app/type';

type JsonObject = { [key: string]: any };

export async function GET(
  request: NextRequest,
) {
  const lpId = request.nextUrl.pathname.match(/[^\/]+$/)?.[0];
  const reportDate = new Date(request.nextUrl.searchParams.get('reportDate') || new Date());
  try {
    if (!lpId) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const lpLookupFilePath = path.join(process.cwd(), 'public', 'reports', 'tbLPLookup.csv');
    const lpLookupBuffer = await fs.readFile(lpLookupFilePath);
    const lpLookupWorkbook = XLSX.read(lpLookupBuffer, { type: 'array' });
    const lpLookupData: JsonObject = XLSX.utils.sheet_to_json(lpLookupWorkbook.Sheets[lpLookupWorkbook.SheetNames[0]]);
    const applicableLp: JsonObject = lpLookupData.find((d: any) => Number(d['SEI_ID_ABF']) === Number(lpId));
    const applicableName = applicableLp?.['LP Short Name'];

    const lpFundLookupFilePath = path.join(process.cwd(), 'public', 'reports', 'tbLPFund.csv');
    const lpFundBuffer = await fs.readFile(lpFundLookupFilePath);
    const lpFundWorkbook = XLSX.read(lpFundBuffer, { type: 'array' });
    const lpFundData: JsonObject = XLSX.utils.sheet_to_json(lpFundWorkbook.Sheets[lpFundWorkbook.SheetNames[0]]);
    const applicableLpPostions: JsonObject[] = lpFundData.filter((d: any) => d['LP Short Name'] === applicableName);

    const ledgerFilePath = path.join(process.cwd(), 'public', 'reports', 'tbLedger.csv');
    const ledgerBuffer = await fs.readFile(ledgerFilePath);
    const ledgerWorkbook = XLSX.read(ledgerBuffer, { type: 'array' });
    const ledgerData: JsonObject = XLSX.utils.sheet_to_json(ledgerWorkbook.Sheets[ledgerWorkbook.SheetNames[0]]);
    
    
    const lpFunds: JsonObject[] = applicableLpPostions.map((d: any) => {
        const applicableLedgerData: JsonObject[] = ledgerData.filter((ledgerField: any) => ledgerField['Related Entity'] === applicableName && ledgerField['Related Fund'] === d['Fund'] && excelDateToJSDate(ledgerField['Effective Date']) <= reportDate);
        const mappedLedgerData: LedgerDetail[] = applicableLedgerData.map((ledgerField: any) => ({
            entryDate: excelDateToJSDate(Number(ledgerField['Entry Date'])),
            activityDate: excelDateToJSDate(Number(ledgerField['Activity Date'])),
            effectiveDate: excelDateToJSDate(Number(ledgerField['Effective Date'])),
            activity: ledgerField['Activity'],
            subActivity: ledgerField['Sub Activity'],
            amount: ledgerField['Amount'],
            entityFrom: ledgerField['Entity From'],
            entityTo: ledgerField['Entity To'],
            relatedEntity: ledgerField['Related Entity'],
            relatedFund: ledgerField['Related Fund']
        }));
        
        const totalCapitalCalled = mappedLedgerData.filter((d: LedgerDetail) => d.activity === 'Capital Call').reduce((acc, curr) => acc + curr.amount, 0)
        const totalCapitalDistributed =  mappedLedgerData.filter((d: LedgerDetail) => d.subActivity === 'Capital Distribution').reduce((acc, curr) => acc + curr.amount, 0)
        return ({
            firstClose: excelDateToJSDate(Number(d['Term End'])),
            reinvestmentStart: d['Reinvest Start'] !== 'NA' ? excelDateToJSDate(Number(d['Reinvest Start'])) : null,
            harvestStart: d['Harvest Start'] ? excelDateToJSDate(Number(d['Term End'])) : null,
            managementFee: d['Management Fee'],
            incentiveFee: d['Incentive'],
            reportedDate: reportDate,
            commitmentAmountTotal: mappedLedgerData.filter((d: LedgerDetail) => d.activity === 'LP Commitment').reduce((acc, curr) => acc + curr.amount, 0),
            capitalCalledTotal: totalCapitalCalled,
            capitalDistributedTotal: totalCapitalDistributed,
            incomeDistributedTotal: mappedLedgerData.filter((d: LedgerDetail) => d.activity === 'Income Distribution').reduce((acc, curr) => acc + curr.amount, 0),
            remainingCapitalTotal: totalCapitalCalled - totalCapitalDistributed,
            irr: 1,
            cashFlows: [],
            ledger: mappedLedgerData
    })});

    return new NextResponse(JSON.stringify({
        id: lpId,
        name: applicableLp?.['LP Short Name'],
        status: applicableLp?.['Status'],
        source: applicableLp?.['Source'],
        firstClose: excelDateToJSDate(Number(applicableLp?.['Effective Date'])),
        inactiveDate: applicableLp?.['Inactive Date'] ? new Date(applicableLp?.['Inactive Date']) : null,
        reinvestmentEnabled: false,
        funds: lpFunds
    }));
  } catch (error) {
    console.error('Error serving file:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 