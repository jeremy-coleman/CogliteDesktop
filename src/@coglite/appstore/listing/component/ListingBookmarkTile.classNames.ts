import { memoizeFunction, mergeStyleSets } from 'office-ui-fabric-react';

import { IListingBookmarkTileStyles } from './ListingBookmarkTile.styles';

interface IListingBookmarkTileClassNames {
    root?: string;
    header?: string;
    headerActions?: string;
    banner?: string;
    title?: string;
    icon?: string;
    removeAction?: string;
}

const getClassNames = memoizeFunction((styles : IListingBookmarkTileStyles, className : string, clickable : boolean) => {
    return mergeStyleSets({
        root: ["listing-bookmark-tile", className, styles.root],
        header: ["listing-bookmark-tile-header", styles.header],
        headerActions: ["listing-bookmark-tile-header-actions", styles.headerActions],
        banner: ["listing-bookmark-banner", styles.banner],
        title: ["listing-bookmark-tile-title", styles.title],
        icon: ["listing-bookmark-title-icon", styles.icon],
        removeAction: ["listing-bookmark-title-remove-action", styles.removeAction]
    });
});

export { IListingBookmarkTileClassNames, getClassNames }