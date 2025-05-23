import { NextResponse } from 'next/server';
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
    
    const worksheet = XLSX.utils.aoa_to_sheet([
      ['Limited Partner', limitedPartnerData.name]
    ]);

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

    XLSX.utils.book_append_sheet(workbook, worksheet, 'summary');
    XLSX.utils.book_append_sheet(workbook, cashflowsWorksheet, 'cashflows');
    XLSX.utils.book_append_sheet(workbook, ledgerWorksheet, 'lp_ledger');

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
