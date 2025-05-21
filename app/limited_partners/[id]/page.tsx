'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation';

interface LimitedPartner {
  id: string;
  name: string;
}

export default function LimitedPartnerPage() {
  const router = useRouter();
  const params = useParams<{id: string}>();
  const [availableLps, setAvailableLps] = useState<LimitedPartner[]>([]);
  const [selectedLp, setSelectedLp] = useState<string>(params.id || '10305');

  useEffect(() => {
    fetch('/api/limited_partners/all')
      .then(res => res.json())
      .then(data => {
        setAvailableLps(data);
      });
  }, []);

  useEffect(() => {
    setSelectedLp(params.id);
  }, [params.id]);

  const handleLpChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = e.target.value;
    router.push(`/limited_partners/${newId}`);
    setSelectedLp(newId);
  };

  return (
    <div>
      <div className="p-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <p className="text-lg font-bold">Selected a Limited Partner:</p>
            <select value={selectedLp} onChange={handleLpChange} className="w-full p-2 max-w-[400px] border border-gray-300 rounded-md text-lg">
              {availableLps?.map((lp) => (
                <option key={lp.id} value={lp.id}>{lp.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
} 