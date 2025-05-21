'use client';

export default function LimitedPartnerPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Limited Partner Details</h1>
        <p>Partner ID: {params.id}</p>
      </div>
    </div>
  );
} 