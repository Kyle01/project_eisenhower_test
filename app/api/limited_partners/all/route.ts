import { NextResponse } from 'next/server';

// Mock data - replace with actual data source in production
const limitedPartners = [
  {
    id: 1,
    name: "ABC Capital",
    type: "Pension Fund",
    country: "United States",
    totalCommitment: 50000000,
    activeFunds: 3
  },
  {
    id: 2,
    name: "XYZ Investments",
    type: "Endowment",
    country: "United Kingdom",
    totalCommitment: 75000000,
    activeFunds: 4
  },
  {
    id: 3,
    name: "Global Ventures",
    type: "Sovereign Wealth Fund",
    country: "Singapore",
    totalCommitment: 100000000,
    activeFunds: 5
  },
  {
    id: 4,
    name: "Pacific Partners",
    type: "Insurance Company",
    country: "Japan",
    totalCommitment: 25000000,
    activeFunds: 2
  },
  {
    id: 5,
    name: "European Capital",
    type: "Family Office",
    country: "Germany",
    totalCommitment: 15000000,
    activeFunds: 1
  }
];

export async function GET() {
  return NextResponse.json(limitedPartners);
} 