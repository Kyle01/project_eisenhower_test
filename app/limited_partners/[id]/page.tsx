'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import { LimitedPartnerDetail } from '@/app/type';
import DisplayCard from '@/app/components/DisplayCard';
import { formatNumberToPercentage, formatNumberToCurrencyMillions } from '@/app/utils';
import "react-datepicker/dist/react-datepicker.css";
import Fund from './Fund';
import CashflowTable from './CashflowTable';  

interface LimitedPartner {
  id: string;
  name: string;
}

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

  const handleLpChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = e.target.value;
    router.push(`/limited_partners/${newId}`);
    setSelectedLp(newId);
  };

  const initiateDownload = () => {
    fetch('/api/downloads', {
      method: 'POST',
      body: JSON.stringify({
        limitedPartnerData: selectedLpDetails
      })
    })
    .then(res => res.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedLpDetails?.name || 'limited_partner'}_report.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  }

  console.log(selectedLpDetails)

  const name = selectedLpDetails?.name;

  return (
    <div className="my-8">
      <div className="space-y-4">
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-4'>
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
          </div>
          <div className='flex justify-center items-center'>
            <button 
              onClick={initiateDownload}
              disabled={!selectedLpDetails}
              className="bg-excelGreen text-white px-4 py-2 rounded-md hover:bg-excelGreen-hover cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              Download Detailed Excel Report
            </button>
          </div>
        </div>
        <div className='grid grid-cols-6 gap-4'>
          <DisplayCard label="Status" value={selectedLpDetails?.status} />
          <DisplayCard label="Source" value={selectedLpDetails?.source} />
          <DisplayCard label="Effective Date" value={selectedLpDetails?.firstClose && new Date(selectedLpDetails?.firstClose).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'}) || 'N/A'  } />
          <DisplayCard label="Inactive Date" value={selectedLpDetails?.inactiveDate && new Date(selectedLpDetails?.inactiveDate).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'}) || 'N/A'} />
          <DisplayCard label="Reinvestment Enabled" value={selectedLpDetails?.reinvestmentEnabled ? 'Yes' : 'No'} />
          <DisplayCard 
            label="IRR" 
            value={selectedLpDetails?.irr && selectedLpDetails?.irr !== 'NA' ? formatNumberToPercentage(Number(selectedLpDetails?.irr)) : 'N/A'} 
            information={selectedLpDetails?.irr && selectedLpDetails?.irr === 'NA' ? `IRR cannot be calculated because committed values are missing` : 'IRR is calculated by considering the cashflows and their effective dates and the most recent capital balance and applying the XIRR formula. See Excel download for more details.'}
          />
          <DisplayCard label="Number of Funds" value={selectedLpDetails?.funds?.length} />
          <DisplayCard label="Commitment Amount" value={formatNumberToCurrencyMillions(selectedLpDetails?.funds?.map((f) => f.commitmentAmountTotal).reduce((acc, a) => acc + a, 0))} />
          <DisplayCard label="Capital Called" value={formatNumberToCurrencyMillions(selectedLpDetails?.funds?.map((f) => f.capitalCalledTotal).reduce((acc, a) => acc + a, 0))} />
          <DisplayCard label="Capital Distributed" value={formatNumberToCurrencyMillions(selectedLpDetails?.funds?.map((f) => f.capitalDistributedTotal).reduce((acc, a) => acc + a, 0))} />
          <DisplayCard label="Remaining Capital" value={formatNumberToCurrencyMillions(selectedLpDetails?.funds?.map((f) => f.remainingCapitalTotal).reduce((acc, a) => acc + a, 0))} />
          <DisplayCard label="Income Distributed" value={formatNumberToCurrencyMillions(selectedLpDetails?.funds?.map((f) => f.incomeDistributedTotal).reduce((acc, a) => acc + a, 0))} />
        </div>
        <div>
          {selectedLpDetails?.funds?.map((fund, index) => <Fund fund={fund} key={index} index={index} />)}
        </div>
        <CashflowTable cashFlows={selectedLpDetails?.cashFlows || []} name={name ?? ''} />
      </div>
    </div>
  );
} 