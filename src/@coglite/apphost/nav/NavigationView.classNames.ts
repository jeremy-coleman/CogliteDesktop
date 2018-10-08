import { memoizeFunction, mergeStyleSets } from 'office-ui-fabric-react';

import { INavigationViewStyles } from './NavigationView.styles';

interface INavigationViewClassNames {
    root?: string;
    title?: string;
    menu?: string;
    menuGlass?: string;
    menuContent?: string;
    menuContentNear?: string;
    menuContentFar?: string;
    menuItemContainer?: string;
    menuItem?: string;
    menuItemTitleContainer?: string;
    menuItemIconContainer?: string;
    menuItemIconAlt?: string;
    main?: string;
}

const getClassNames = memoizeFunction((styles : INavigationViewStyles, className?: string) : INavigationViewClassNames => {
    return mergeStyleSets({
        root: ["navigation-view", className, styles.root],
        menu: ["navigation-view-menu", styles.menu],
        menuGlass: ["navigation-view-menu-glass", styles.menuGlass],
        menuContent: ["navigation-view-menu-content", styles.menuContent],
        title: ["navigation-view-title", styles.title],
        menuContentNear: ["navigation-view-menu-content-near", styles.menuContentNear],
        menuContentFar: ["navigation-view-menu-far", styles.menuContentFar],
        menuItemContainer: ["navigation-view-menu-item-container", styles.menuItemContainer],
        menuItem: ["navigation-view-menu-item", styles.menuItem],
        menuItemTitleContainer: ["navigation-view-menu-item-title-container", styles.menuItemTitleContainer],
        menuItemIconContainer: ["navigation-view-menu-item-icon-container", styles.menuItemIconContainer],
        menuItemIconAlt: ["navigation-view-menu-item-icon-alt", styles.menuItemIconAlt],
        main: ["navigation-view-main", styles.main]
    });
});

export { INavigationViewClassNames, getClassNames }