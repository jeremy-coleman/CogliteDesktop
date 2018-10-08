import { memoizeFunction, mergeStyleSets } from 'office-ui-fabric-react';

import { IDashboardAddStyles } from './DashboardAdd.styles';

interface IDashboardAddClassNames {
    root?: string;
    editor?: string;
    actions?: string;
    action?: string;
}

const getClassNames = memoizeFunction((styles : IDashboardAddStyles, className?: string) : IDashboardAddClassNames => {
    return mergeStyleSets({
        root: ["dashboard-add", styles.root, className],
        editor: ["dashboard-add-editor", styles.editor],
        actions: ["dashboard-add-actions", styles.actions],
        action: ["dasboard-add-action", styles.action]
    });
});

export { IDashboardAddClassNames, getClassNames }