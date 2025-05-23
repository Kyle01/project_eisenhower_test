import { NextResponse } from 'next/server';
import { jsDateToExcelDate } from '@/app/utils';
import * as XLSX from 'xlsx';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.limitedPartnerData) {
      return NextResponse.json(
        { error: 'limitedPartnerData is required' },
        { status: 400 }
      );
    }

    const { limitedPartnerData } = body;

    const workbook = XLSX.utils.book_new();
    
    const summaryData = Object.entries(limitedPartnerData)
      .filter(([_, value]) => 
        value !== null && 
        typeof value !== 'object' && 
        !Array.isArray(value)
      )
      .map(([key, value]) => [key, value]);

    const summaryWorksheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summaryWorksheet, 'summary');

    const cashflowsWorksheet = XLSX.utils.json_to_sheet(limitedPartnerData.cashFlows || []);
    const ledgerWorksheet = XLSX.utils.json_to_sheet(limitedPartnerData.ledger || []);

    if (limitedPartnerData?.funds) {
      limitedPartnerData.funds.forEach((fund: any, index: number) => {
        const fundData = Object.entries(fund)
          .filter(([key]) => key !== 'ledger')
          .map(([key, value]) => [key, value]);

        if (fund.ledger) {
          fundData.push(['', '']);
          fundData.push(['Ledger Data', '']);
          const ledgerData = fund.ledger.map((entry: any) => 
            Object.entries(entry).map(([key, value]) => [key, value])
          ).flat();
          fundData.push(...ledgerData);
        }

        const fundWorksheet = XLSX.utils.aoa_to_sheet(fundData);
        XLSX.utils.book_append_sheet(workbook, fundWorksheet, `Fund_${index + 1}`);
      });
    }

    XLSX.utils.book_append_sheet(workbook, cashflowsWorksheet, 'cashflows');
    XLSX.utils.book_append_sheet(workbook, ledgerWorksheet, 'lp_ledger');

    const applicableCashflows = limitedPartnerData.ledger.filter((ledger: any) => ledger.activity === 'Capital Call' || ledger.activity === 'LP Distribution')
    const finalCapitalBalance = {amount: limitedPartnerData.cashFlows.at(-1)['Ending Capital Balance'], when: limitedPartnerData.cashFlows.at(-1).key}
    const irrData = [
      ['Calculated IRR', '=XIRR(C4:C100, A2:A100)'],
      ['', ''],
      ['Applied Cashflows', ''],
      ...applicableCashflows.map((cashflow: any) => [jsDateToExcelDate(new Date(cashflow.activityDate)), cashflow.activity, cashflow.activity === 'Capital Call' ? cashflow.amount * -1 : cashflow.amount]),
      [jsDateToExcelDate(new Date(finalCapitalBalance.when)), 'Final Capital Balance', finalCapitalBalance.amount]
    ];
    const irrWorksheet = XLSX.utils.aoa_to_sheet(irrData);
    
    const range = XLSX.utils.decode_range(irrWorksheet['!ref'] || 'A1');
    for (let R = 3; R <= range.e.r; R++) {
      const cellRef = XLSX.utils.encode_cell({ r: R, c: 0 });
      if (!irrWorksheet[cellRef]) continue;
      
      irrWorksheet[cellRef].z = 'mm/dd/yyyy';
    }
    
    XLSX.utils.book_append_sheet(workbook, irrWorksheet, 'irr_calculation');

    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    return new NextResponse(excelBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="limited_partner.xlsx"'
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
