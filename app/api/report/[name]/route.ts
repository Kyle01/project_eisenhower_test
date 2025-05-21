import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(
  { params }: { params: { name: string } }
) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'reports', params.name);
    const fileBuffer = await fs.readFile(filePath);
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${params.name}"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Report not found' }, { status: 404 });
  }
} 