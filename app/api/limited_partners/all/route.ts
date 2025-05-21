import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

export async function GET(request: Request) {
    try {
        // Get the origin from the request
        const origin = request.headers.get('origin') || 'http://localhost:3000';
        // Use the full URL
        const response = await fetch(`${origin}/reports/tbLPLookup.csv`);
        if (!response.ok) {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }
        
        const buffer = await response.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: 'array' });
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        const applicableData = data.map((d: any) => ({
            id: d['SEI_ID_ABF'],
            name: d['LP Short Name'],
        }))
        return NextResponse.json(applicableData);
    } catch (error) {
        console.error('Error reading file:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 