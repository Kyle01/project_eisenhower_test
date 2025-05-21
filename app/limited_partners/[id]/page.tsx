'use client';

import { useState } from 'react';
import TabBar from '../../components/TabBar';
import Button from '../../components/Button';

const tabs = [
  { label: "Limited Partners", url: "/limited_partners/1" },
  { label: "Reports", url: "/reports" },
];

export default function LimitedPartnerPage({ params }: { params: { id: string } }) {
  const [healthMessage, setHealthMessage] = useState<string>('');

  const checkHealth = async () => {
    try {
      const response = await fetch('/api/health');
      const data = await response.json();
      setHealthMessage(data.message);
    } catch (error) {
      setHealthMessage('Error checking health');
    }
  };

  return (
    <div>
      <TabBar tabs={tabs} />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Limited Partner Details</h1>
        <p className="mb-4">Partner ID: {params.id}</p>
        
        <div className="space-y-4">
          <Button label="Check Health" onClick={checkHealth} />
          {healthMessage && (
            <p className="text-shamrock-600 font-medium">{healthMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
} 