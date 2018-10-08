import { memoizeFunction, mergeStyleSets } from 'office-ui-fabric-react';

import { IListingIconTileStyles } from './ListingIconTile.styles';

interface IListingIconTileClassNames {
    root?: string;
    top?: string;
    content?: string;
    title?: string;
}

const getClassNames = memoizeFunction((styles : IListingIconTileStyles, className?: string) : IListingIconTileClassNames => {
    return mergeStyleSets({
        root: ["listing-icon-tile", styles.root, className],
        top: ["listing-icon-tile-top", styles.top],
        content: ["listing-icon-tile-content", styles.content],
        title: ["listing-icon-tile-title", styles.title]
    })
});

export {
    IListingIconTileClassNames,
    getClassNames
}