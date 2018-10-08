import { memoizeFunction, mergeStyleSets } from 'office-ui-fabric-react';

import { IAppPanelStyles } from './AppPanel.styles';

interface IAppPanelClassNames {
    root?: string;
    navigation?: string;
    header?: string;
    headerText?: string;
    closeButton?: string;
}

const getClassNames = memoizeFunction((styles : IAppPanelStyles, className?: string) : IAppPanelClassNames => {
    return mergeStyleSets({
        root: ["app-panel", className, styles.root],
        navigation: ["app-panel-navigation", styles.navigation],
        header: ["app-panel-header", styles.header],
        headerText: ["app-panel-header-text", styles.headerText],
        closeButton: ["app-panel-close-button", styles.closeButton]
    });
});

export { IAppPanelClassNames, getClassNames }