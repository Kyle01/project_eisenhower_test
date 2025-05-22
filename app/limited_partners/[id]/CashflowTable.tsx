import { useRef } from "react";
import { ColDef } from "ag-grid-community";
import OpinionatedTable from "../../components/OpinionatedTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { JsonObject } from "../../type";
import { sharedColumnDefs } from "../../style";

interface CashflowTableProps {
    cashFlows: JsonObject[];
    name: string;
}

const columnDefs: ColDef[] = [
    { ...sharedColumnDefs.date, field: 'key', headerName: 'Date' },
    { ...sharedColumnDefs.moneyNoDecimals, field: 'Beginning Capital Balance', headerName: 'Beginning Capital Balance' },
    { ...sharedColumnDefs.moneyNoDecimals, field: 'Capital Calls', headerName: 'Capital Calls' },
    { ...sharedColumnDefs.moneyNoDecimals, field: 'Carried Interest', headerName: 'Carried Interest' },
    { ...sharedColumnDefs.moneyNoDecimals, field: 'Distributions', headerName: 'Distributions' },
    { ...sharedColumnDefs.moneyNoDecimals, field: 'Ending Capital Balance', headerName: 'Ending Capital Balance' },
    { ...sharedColumnDefs.moneyNoDecimals, field: 'Fund Expenses', headerName: 'Fund Expenses' },
    { ...sharedColumnDefs.moneyNoDecimals, field: 'Interest Income', headerName: 'Interest Income' },
    { ...sharedColumnDefs.moneyNoDecimals, field: 'Investment Expenses', headerName: 'Investment Expenses' },
    { ...sharedColumnDefs.moneyNoDecimals, field: 'Management Fees', headerName: 'Management Fees' },
    { ...sharedColumnDefs.moneyNoDecimals, field: 'Realized Gain / (Loss)', headerName: 'Realized Gain / (Loss)' },
    { ...sharedColumnDefs.moneyNoDecimals, field: 'Unrealized Gain / (Loss)', headerName: 'Unrealized Gain / (Loss)' },
]

export default function CashflowTable({ cashFlows, name }: CashflowTableProps) {
    const gridRef = useRef(null);

    return (
        <div> 
            <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-medium text-gray-200 underline">Limited Partner Capital Activity</p>
                <button className="bg-gray-800 space-x-2 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-md cursor-pointer" onClick={() => {
                    const grid = gridRef.current as any;
                    if (grid && grid.api) {
                        grid.api.exportDataAsCsv({
                            fileName: `${name} - Capital Activity.csv`,
                            includeHiddenColumns: true,
                        });
                    }
                }}>
                    <FontAwesomeIcon icon={faDownload}  />
                    <FontAwesomeIcon icon={faFileExcel} />
                </button>
            </div>
            <div className="h-[250px]">
                <OpinionatedTable
                    ref={gridRef}
                    columnDefs={columnDefs}
                    rowData={cashFlows}
                />
            </div>
        </div>
    )
}