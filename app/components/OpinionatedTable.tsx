import { forwardRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, ColDef, AllCommunityModule } from 'ag-grid-community';
import { themeBalham, colorSchemeDarkBlue } from 'ag-grid-community';

ModuleRegistry.registerModules([ AllCommunityModule ])

const themeBalhamDark = themeBalham.withPart(colorSchemeDarkBlue);

interface OpinionatedTableProps {
    columnDefs: ColDef[];
    rowData: any[];
}

const OpinionatedTable = forwardRef<any, OpinionatedTableProps>(({ columnDefs, rowData }, ref) => {
    return (
        <AgGridReact
            ref={ref}
            columnDefs={columnDefs}
            rowData={rowData}
            theme={themeBalhamDark}
        />
    );
});

OpinionatedTable.displayName = 'OpinionatedTable';

export default OpinionatedTable;