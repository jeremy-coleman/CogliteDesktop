import { memoizeFunction, mergeStyleSets } from 'office-ui-fabric-react';

import { IGridStyles } from './Grid.styles';

interface IGridClassNames {
    root?: string;
    gridCells?: string;
    overlay?: string;
    row?: string;
    cell?: string;
    portal?: string;
}

const getClassNames = memoizeFunction((styles : IGridStyles, className?: string) => {
    return mergeStyleSets({
        root: ["grid", className, styles.root],
        gridCells: ["grid-cells", styles.gridCells],
        overlay: ["grid-overlay", styles.overlay],
        row: ["grid-row", styles.row],
        cell: ["grid-cell", styles.cell],
        portal: ["grid-portal", styles.portal]
    });
});

export { IGridClassNames, getClassNames }