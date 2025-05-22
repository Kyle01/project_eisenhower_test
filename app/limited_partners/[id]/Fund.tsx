import { useRef, useState } from "react";
import { formatNumberToPercentage, formatNumberToCurrency } from "@/app/utils";
import { LimitedPartnerFundDetail } from "@/app/type";
import { sharedColumnDefs } from "@/app/style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faDownload, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import OpinionatedTable from "../../components/OpinionatedTable";
import { ColDef } from "ag-grid-community";

interface FundProps {
    fund: LimitedPartnerFundDetail;
    index: number;
}

const columnDefs: ColDef[] = [
    { ...sharedColumnDefs.date, field: 'entryDate', headerName: 'Entry Date' },
    { ...sharedColumnDefs.date, field: 'activityDate', headerName: 'Activity Date' },
    { ...sharedColumnDefs.date, field: 'effectiveDate', headerName: 'Effective Date' },
    { field: 'activity', headerName: 'Activity', width: 150, filter: true },
    { field: 'subActivity', headerName: 'Sub Activity', width: 150, filter: true },
    { ...sharedColumnDefs.money, field: 'amount', headerName: 'Amount' },
    { field: 'entityFrom', headerName: 'Entity From', width: 125, filter: true },
    { field: 'entityTo', headerName: 'Entity To', width: 125, filter: true },
    { field: 'relatedEntity', headerName: 'Related Entity', width: 125, filter: true },
    { field: 'relatedFund', headerName: 'Related Fund', width: 150, filter: true }
]


export default function Fund({ fund, index }: FundProps) {
    const gridRef = useRef(null);
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="py-2">
            <div className="border border-gray-700 rounded-lg overflow-hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-4 py-3 flex items-center justify-between bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
                >
                    <h2 className="text-xl font-medium text-gray-200">Fund {index + 1}: {fund.name}</h2>
                    <FontAwesomeIcon 
                        icon={faChevronDown}
                        className={`w-4 h-4 text-gray-300 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
                    />
                </button>
                <div 
                    className={`grid grid-cols-2 gap-4 transition-all duration-300 ease-in-out ${
                        isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                >
                    <div className="pt-4 px-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-800">
                                        <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-300 border-b border-gray-700">Fund Statistics</th>
                                        <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-300 border-b border-gray-700 text-right">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-gray-900 hover:bg-gray-800">
                                        <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800">First Close</td>
                                        <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800 text-right">{fund.firstClose ? new Date(fund.firstClose).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'}) : '-'}</td>
                                    </tr>
                                    <tr className="bg-gray-950 hover:bg-gray-800">
                                        <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800">Reinvestment Start</td>
                                        <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800 text-right">{fund.reinvestmentStart ? new Date(fund.reinvestmentStart).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'}) : '-'}</td>
                                    </tr>
                                    <tr className="bg-gray-900 hover:bg-gray-800">
                                        <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800">Harvest Start</td>
                                        <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800 text-right">{fund.harvestStart ? new Date(fund.harvestStart).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'}) : '-'}</td>
                                    </tr>
                                    <tr className="bg-gray-950 hover:bg-gray-800">
                                        <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800">Management Fee</td>
                                        <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800 text-right">{formatNumberToPercentage(fund.managementFee)}</td>
                                    </tr>
                                    <tr className="bg-gray-900 hover:bg-gray-800">
                                        <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800">Incentive Fee</td>
                                        <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800 text-right">{formatNumberToPercentage(fund.incentiveFee)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="pt-4 px-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-800">
                                        <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-300 border-b border-gray-700">Fund Financials</th>
                                        <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-300 border-b border-gray-700 text-right">Value</th>
                                    </tr>
                                </thead>
                                <tbody> 
                                    <tr className="bg-gray-950 hover:bg-gray-800">
                                        <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800">Commitment Amount Total</td>
                                        <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800 text-right">{formatNumberToCurrency(fund.commitmentAmountTotal)}</td>
                                    </tr>
                                    <tr className="bg-gray-900 hover:bg-gray-800">
                                        <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800">Capital Called Total</td>
                                        <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800 text-right">{formatNumberToCurrency(fund.capitalCalledTotal)}</td>
                                    </tr>
                                    <tr className="bg-gray-950 hover:bg-gray-800">
                                        <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800">Capital Distributed Total</td>
                                        <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800 text-right">{formatNumberToCurrency(fund.capitalDistributedTotal)}</td>
                                    </tr>
                                    <tr className="bg-gray-900 hover:bg-gray-800">
                                        <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800">Income Distributed Total</td>
                                        <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800 text-right">{formatNumberToCurrency(fund.incomeDistributedTotal)}</td>
                                    </tr>
                                    <tr className="bg-gray-950 hover:bg-gray-800">
                                        <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800">Remaining Capital Total</td>
                                        <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800 text-right">{formatNumberToCurrency(fund.remainingCapitalTotal)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="px-4 flex justify-between items-center">
                            <p className="text-lg font-medium text-gray-200">Fund Ledger Transactions:</p>
                            <button className="bg-gray-800 space-x-2 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-md cursor-pointer" onClick={() => {
                                const grid = gridRef.current as any;
                                if (grid && grid.api) {
                                    grid.api.exportDataAsCsv({
                                        fileName: `${fund.name} - Ledger.csv`,
                                        includeHiddenColumns: true,
                                    });
                                }
                            }}>
                                <FontAwesomeIcon icon={faDownload}  />
                                <FontAwesomeIcon icon={faFileExcel} />
                            </button>
                        </div>
                        <div className="p-4 h-[300px]">
                            <OpinionatedTable
                                ref={gridRef}
                                columnDefs={columnDefs}
                                rowData={fund.ledger}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}