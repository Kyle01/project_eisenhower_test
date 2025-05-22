import { formatNumberToPercentage, formatNumberToCurrency } from "@/app/utils";
import { LimitedPartnerFundDetail } from "@/app/type";

interface FundProps {
    fund: LimitedPartnerFundDetail;
    index: number;
}

export default function Fund({ fund, index }: FundProps) {
    return (
        <div className="py-2">
            <div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h2 className="text-xl font-medium mb-2 text-gray-200">Fund {index + 1}: {fund.name}</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-800">
                                    <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-300 border-b border-gray-700">Field</th>
                                    <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-300 border-b border-gray-700 text-right">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-gray-900 hover:bg-gray-800">
                                    <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800">First Close</td>
                                    <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800 text-right">{fund.firstClose ? new Date(fund.firstClose).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'}) : '-'}</td>
                                </tr>
                                <tr className="bg-gray-950 hover:bg-gray-800">
                                    <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800">Reinvestment Start</td>
                                    <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800 text-right">{fund.reinvestmentStart ? new Date(fund.reinvestmentStart).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'}) : '-'}</td>
                                </tr>
                                <tr className="bg-gray-900 hover:bg-gray-800">
                                    <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800">Harvest Start</td>
                                    <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800 text-right">{fund.harvestStart ? new Date(fund.harvestStart).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'}) : '-'}</td>
                                </tr>
                                <tr className="bg-gray-950 hover:bg-gray-800">
                                    <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800">Management Fee</td>
                                    <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800 text-right">{formatNumberToPercentage(fund.managementFee)}</td>
                                </tr>
                                <tr className="bg-gray-900 hover:bg-gray-800">
                                    <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800">Incentive Fee</td>
                                    <td className="px-3 py-1.5 text-xs text-gray-300 border-b border-gray-800 text-right">{formatNumberToPercentage(fund.incentiveFee)}</td>
                                </tr>
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
            </div>
        </div>
    )
}