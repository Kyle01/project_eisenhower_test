'use client';

import { useState } from 'react';
import Button from '../../components/Button';
import { useParams } from 'next/navigation'

export default function LimitedPartnerPage() {
  const params = useParams<{id: string}>();
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