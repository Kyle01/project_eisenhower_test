'use client';

interface ReportsProps {
    name: string;
    description: string;
    downloadUrl: string;
}

const Reports = ({ name, description, downloadUrl }: ReportsProps) => {
    return (
        <div>
            <h1>{name}</h1>
        </div>
    )
}

export default function ReportsPage() {
  return (
    <div>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Reports</h1>
        <p>View and manage reports here.</p>
      </div>
    </div>
  );
} 