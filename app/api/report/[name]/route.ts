import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(
  _request: Request,
  { params }: { params: { name: string } }
) {
  const { name } = params;
  try {
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    // Ensure we're using the correct path to the public directory
    const publicDir = path.join(process.cwd(), 'public');
    const reportsDir = path.join(publicDir, 'reports');
    const filePath = path.join(reportsDir, name);

    // Check if file exists
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