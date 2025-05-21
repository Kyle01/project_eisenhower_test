'use client';

import Button from '../components/Button';

interface ReportsProps {
    name: string;
    description: string;
    onClick: () => void;
    children?: React.ReactNode;
}

const Reports = ({ name, description, onClick, children }: ReportsProps) => {
  return (
    <div className="rounded-lg bg-slate-800 p-4 flex flex-col justify-between h-[450px]">
        <div>
          <h1 className="text-2xl font-bold mb-4">{name}</h1>
          <p className="text-sm text-gray-500 mb-4">{description}</p>
          {children}
        </div>
        <div className="flex justify-center">
          <Button 
            onClick={onClick}
            label="Download"
          />
        </div>
    </div>
  )
}

const reports = [
  {
    name: 'tbLPLookup',
    description: 'Source Document - Table with unique LP (investor) names and some descriptive information',
    filePath: 'tbLPLookup.csv',
  },
  {
    name: 'tbLPFund',
    description: 'Source Document - Table showing the funds in which the LP is an investor along with certain information regarding their investment in each fund',
    filePath: 'tbLPFund.csv',
  },
  {
    name: 'tbPCAP',
    description: 'Source Document - Table showing each investor’s capital activity at the end of each fiscal quarter',
    filePath: 'tbPCAP.csv',
  },
  {
    name: 'tbLedger',
    description: 'Source Document - Subset of a daily ledger table showing various cash and non-cash activities related to each LP.',
    filePath: 'tbLedger.csv',
  },
]


export default function ReportsPage() {

  const downloadReport = (reportName: string): void => {
    try {
      fetch(`/api/report/${reportName}`).then((response) => {
        response.blob().then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = reportName;
          document.body.appendChild(a);
          a.click();
        })
      }).catch((error) => {
        console.error('Error downloading report:', error);
      })
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  return (
    <div>
      <div className="p-8">
        <div className="grid grid-cols-4 gap-4">
          {reports.map((report) => (
            <Reports 
              key={report.name} 
              name={report.name} 
              description={report.description} 
              onClick={() => downloadReport(report.filePath)}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 