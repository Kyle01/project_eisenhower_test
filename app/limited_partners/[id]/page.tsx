'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import { LimitedPartnerDetail } from '@/app/type';
import DisplayCard from '@/app/components/DisplayCard';
import { formatNumberToPercentage } from '@/app/utils';
import "react-datepicker/dist/react-datepicker.css";
import Fund from './Fund';
import CashflowTable from './CashflowTable';

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
  const [selectedLpDetails, setSelectedLpDetails] = useState<LimitedPartnerDetail | null>(null);

  useEffect(() => {
    fetch('/api/limited_partners/all')
      .then(res => res.json())
      .then(data => {
        setAvailableLps(data);
      });
  }, []);

  useEffect(() => {
    setSelectedLp(params.id);
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

  const name = selectedLpDetails?.name;

  return (
    <div className="my-8">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 max-w-[500px] items-center">
          <p className="text-lg font-bold">Selected a Limited Partner:</p>
          <select value={selectedLp} onChange={handleLpChange} className="w-full p-2 max-w-[400px] border border-gray-300 rounded-md text-lg">
            {availableLps?.map((lp) => (
              <option key={lp.id} value={lp.id}>{lp.name}</option>
            ))}
          </select>
        </div>
          <div className="grid grid-cols-2 gap-4 max-w-[500px] items-center">
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
        <div className='grid grid-cols-6 gap-4'>
          <DisplayCard label="Status" value={selectedLpDetails?.status} />
          <DisplayCard label="Source" value={selectedLpDetails?.source} />
          <DisplayCard label="First Close" value={selectedLpDetails?.firstClose && new Date(selectedLpDetails?.firstClose).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'}) || 'N/A'  } />
          <DisplayCard label="Inactive Date" value={selectedLpDetails?.inactiveDate && new Date(selectedLpDetails?.inactiveDate).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'}) || 'N/A'} />
          <DisplayCard label="Reinvestment Enabled" value={selectedLpDetails?.reinvestmentEnabled ? 'Yes' : 'No'} />
          <DisplayCard 
            label="IRR" 
            value={selectedLpDetails?.irr && selectedLpDetails?.irr !== 'NA' ? formatNumberToPercentage(Number(selectedLpDetails?.irr)) : 'N/A'} 
            information={selectedLpDetails?.irr && selectedLpDetails?.irr === 'NA' ? `IRR cannot be calculated because committed values are missing` : 'IRR is calculated by considering the cashflows and the most recent capital balance and applying the XIRR formula. See Excel for more details. '}
          />
        </div>
        <p className="text-lg font-bold underline">Client Participating Funds: {selectedLpDetails?.funds.length}</p>
        <div>
          {selectedLpDetails?.funds.map((fund, index) => <Fund fund={fund} key={index} index={index} />)}
        </div>
        <CashflowTable cashFlows={selectedLpDetails?.cashFlows || []} name={name ?? ''} />
      </div>
    </div>
  );
} 