import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
) {
  const name = request.nextUrl.pathname.match(/[^\/]+$/)?.[0];
  try {
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const publicDir = path.join(process.cwd(), 'public');
    const reportsDir = path.join(publicDir, 'reports');
    const filePath = path.join(reportsDir, name);

    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const fileBuffer = await fs.readFile(filePath);
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${name}"`,
      },
    });
  } catch (error) {
    console.error('Error serving file:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 