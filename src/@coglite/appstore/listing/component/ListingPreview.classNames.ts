import { memoizeFunction, mergeStyleSets } from 'office-ui-fabric-react';

import { IListingPreviewStyles } from './ListingPreview.styles';

interface IListingPreviewClassNames {
    root?: string;
    fallback?: string;
    fallbackIcon?: string;
}

const getClassNames = memoizeFunction((styles : IListingPreviewStyles, className : string) => {
    return mergeStyleSets({
        root: ["listing-preview", className, styles.root],
        fallback: ["listing-preview-fallback", styles.fallback],
        fallbackIcon: ["listing-preview-fallback-icon", styles.fallbackIcon]
    });
});

export { IListingPreviewClassNames, getClassNames }