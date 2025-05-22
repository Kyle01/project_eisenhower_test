import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { promises as fs } from 'fs';
import path from 'path';
import { excelDateToJSDate } from '@/app/utils';

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
    
    const lpFunds: JsonObject[] = applicableLpPostions.map((d: any) => ({
        firstClose: excelDateToJSDate(Number(d['Term End'])),
        reinvestmentStart: d['Reinvest Start'] !== 'NA' ? excelDateToJSDate(Number(d['Reinvest Start'])) : null,
        harvestStart: d['Harvest Start'] ? excelDateToJSDate(Number(d['Term End'])) : null,
        managementFee: d['Management Fee'],
        incentiveFee: d['Incentive'],
        reportedDate: reportDate,
        commitmentAmountTotal: 1,
        capitalCalledTotal: 1,
        capitalDistributedTotal: 1,
        incomeDistributedTotal: 1,
        remainingCapitalTotal: 1,
        irr: 1,
        cashFlows: []
    }));

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