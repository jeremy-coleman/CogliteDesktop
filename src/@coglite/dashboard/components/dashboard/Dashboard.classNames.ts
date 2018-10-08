import { memoizeFunction, mergeStyleSets } from 'office-ui-fabric-react';

import { IDashboardStyles } from './Dashboard.styles';

interface IDashboardClassNames {
    root?: string;
    content?: string;
    overlay?: string;
}

const getClassNames = memoizeFunction((styles : IDashboardStyles, className?: string) => {
    return mergeStyleSets({
        root: ["dashboard", className, styles.root],
        content: ["dashboard-content", styles.content],
        overlay: ["dashboard-overlay", styles.overlay]
    });
});

export { IDashboardClassNames, getClassNames }