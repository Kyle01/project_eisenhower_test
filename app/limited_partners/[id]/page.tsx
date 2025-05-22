'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface LimitedPartner {
  id: string;
  name: string;
}

type JsonObject = { [key: string]: any };

export default function LimitedPartnerPage() {
  const router = useRouter();
  const params = useParams<{id: string}>();
  const [availableLps, setAvailableLps] = useState<LimitedPartner[]>([]);
  const [selectedLp, setSelectedLp] = useState<string>(params.id || '10305');
  const [selectedReportDate, setSelectedReportDate] = useState<Date>(new Date());
  const [selectedLpDetails, setSelectedLpDetails] = useState<JsonObject | null>(null);

  useEffect(() => {
    fetch('/api/limited_partners/all')
      .then(res => res.json())
      .then(data => {
        setAvailableLps(data);
      });
  }, []);

  useEffect(() => {
    setSelectedLp(params.id);
    const applicableLp = availableLps.find(lp => lp.id === selectedLp);
    fetch(`/api/limited_partners/${params.id}?reportDate=${selectedReportDate.toISOString()}`)
      .then(res => res.json())
      .then(data => {
        setSelectedLpDetails(data);
      });
  }, [params.id, selectedReportDate]);

  console.log(selectedLpDetails)

  const handleLpChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = e.target.value;
    router.push(`/limited_partners/${newId}`);
    setSelectedLp(newId);
  };

  return (
    <div>
      <div className="p-8">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 max-w-[500px]">
            <p className="text-lg font-bold">Selected a Limited Partner:</p>
            <select value={selectedLp} onChange={handleLpChange} className="w-full p-2 max-w-[400px] border border-gray-300 rounded-md text-lg">
              {availableLps?.map((lp) => (
                <option key={lp.id} value={lp.id}>{lp.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-[500px]">
            <p className="text-lg font-bold">Applied Report Date:</p>
            <DatePicker
              selected={selectedReportDate}
              onChange={(date) => setSelectedReportDate(date || new Date())}
              maxDate={new Date()}
              className="w-full p-1 max-w-[400px] border border-gray-300 rounded-md text-lg"
              showMonthDropdown
              showYearDropdown
            />
          </div>
        </div>
      </div>
    </div>
  );
} 