import { memoizeFunction, mergeStyleSets } from 'office-ui-fabric-react';

import { IAppViewStyles } from './AppView.styles';

interface IAppViewClassNames {
    root?: string;
    menuContainer?: string;
    main?: string;
}

const getClassNames = memoizeFunction((styles : IAppViewStyles, className?: string) : IAppViewClassNames => {
    return mergeStyleSets({
        root: ["app-view", styles.root, className],
        menuContainer: ["app-view-menu-container", styles.menuContainer],
        main: ["app-view-main", styles.main]
    });
});

export { IAppViewClassNames, getClassNames }