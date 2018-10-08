import { memoizeFunction, mergeStyles } from 'office-ui-fabric-react';

import { IListingListStyles } from './ListingList.styles';

interface IListingListClassNames {
    root?: string;
}

const getClassNames = memoizeFunction((styles : IListingListStyles, className : string, compact : boolean, wrapping : boolean) => {
    return {
        root: mergeStyles("listing-list", className, styles.root, compact && styles.compactRoot, wrapping && styles.wrappingRoot)
    };
});

export { IListingListClassNames, getClassNames }