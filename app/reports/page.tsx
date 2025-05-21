'use client';

interface ReportsProps {
    name: string;
    description: string;
    downloadUrl?: string;
    children?: React.ReactNode;
}

const Reports = ({ name, description, downloadUrl, children }: ReportsProps) => {
    return (
        <div className="rounded-lg bg-slate-800 p-4 flex flex-col justify-between h-[450px]">
            <div>
              <h1 className="text-2xl font-bold mb-4">{name}</h1>
              <p className="text-sm text-gray-500 mb-4">{description}</p>
              {children}
            </div>
            <div className="flex justify-center">
              <button 
                className="bg-shamrock-400 text-white px-4 py-2 rounded-md hover:bg-shamrock-600 cursor-pointer"
                onClick={() => window.open(downloadUrl, '_blank')}
              >
                Download
              </button>
            </div>
        </div>
    )
}

const reports = [
  {
    name: 'tbLPLookup',
    description: 'Source Document - Table with unique LP (investor) names and some descriptive information',
    downloadUrl: 'https://example.com/report1.pdf',
  },
  {
    name: 'tbLPFund',
    description: 'Source Document - Table showing the funds in which the LP is an investor along with certain information regarding their investment in each fund',
    downloadUrl: 'https://example.com/report1.pdf',
  },
  {
    name: 'tbPCAP',
    description: 'Source Document - Table showing each investor’s capital activity at the end of each fiscal quarter',
    downloadUrl: 'https://example.com/report1.pdf',
  },
  {
    name: 'tbLedger',
    description: 'Source Document - Subset of a daily ledger table showing various cash and non-cash activities related to each LP.',
    downloadUrl: 'https://example.com/report1.pdf',
  },
]


export default function ReportsPage() {
  return (
    <div>
      <div className="p-8">
        <div className="grid grid-cols-4 gap-4">
          {reports.map((report) => (
            <Reports key={report.name} {...report} />
          ))}
        </div>
      </div>
    </div>
  );
} 