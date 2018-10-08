import { memoizeFunction, mergeStyleSets } from 'office-ui-fabric-react';

import { IListingTileStyles } from './ListingTile.styles';

interface IListingTileClassNames {
    root?: string;
    top?: string;
    banner?: string;
    content?: string;
    actions?: string;
    title?: string;
    shortDescription?: string;
}

const getClassNames = memoizeFunction((styles : IListingTileStyles, className : string, clickable : boolean) => {
    return mergeStyleSets({
        root: ["listing-tile", className, styles.root, clickable && styles.clickableRoot],
        top: ["listing-tile-top", styles.top],
        banner: ["listing-tile-banner", styles.banner],
        content: ["listing-tile-content", styles.content],
        actions: ["listing-tile-actions", styles.actions],
        title: ["listing-tile-title", styles.title],
        shortDescription: ["listing-tile-short-description", styles.shortDescription]
    });
});

export { IListingTileClassNames, getClassNames }