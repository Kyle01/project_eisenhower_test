import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: Request) {
    try {
        const publicDir = path.join(process.cwd(), 'public');
        const reportsDir = path.join(publicDir, 'reports');
        const filePath = path.join(reportsDir, 'tbLPLookup.csv');

        console.log('Attempting to read file from:', filePath);
        console.log('Current working directory:', process.cwd());

        try {
            await fs.access(filePath);
        } catch (error: any) {
            console.error('File access error:', error);
            return NextResponse.json({ error: 'File not found', details: error.message }, { status: 404 });
        }

        const buffer = await fs.readFile(filePath);
        console.log('File read successfully, buffer size:', buffer.length);
        
        const workbook = XLSX.read(buffer, { type: 'array' });
        console.log('Workbook parsed successfully, sheets:', workbook.SheetNames);
        
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        console.log('Data parsed successfully, rows:', data.length);
        
        const applicableData = data.map((d: any) => ({
            id: d['SEI_ID_ABF'],
            name: d['LP Short Name'],
        }))
        return NextResponse.json(applicableData);
    } catch (error: any) {
        console.error('Error reading file:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            code: error.code
        });
        return NextResponse.json({ 
            error: 'Internal server error', 
            details: error.message,
            code: error.code 
        }, { status: 500 });
    }
} 