import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: Request) {
    try {
        const publicDir = path.join(process.cwd(), 'public');
        const reportsDir = path.join(publicDir, 'reports');
        const filePath = path.join(reportsDir, 'tbLPLookup.csv');

        try {
            await fs.access(filePath);
        } catch {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }

        const buffer = await fs.readFile(filePath);
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