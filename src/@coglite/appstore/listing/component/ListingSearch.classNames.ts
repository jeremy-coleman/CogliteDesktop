import { memoizeFunction, mergeStyleSets } from 'office-ui-fabric-react';

import { IListingSearchStyles } from './ListingSearch.styles';

interface IListingSearchClassNames {
    root?: string;
    input?: string;
    results?: string;
}

const getClassNames = memoizeFunction((styles : IListingSearchStyles, className?: string) : IListingSearchClassNames => {
    return mergeStyleSets({
        root: ["listing-search", className, styles.root],
        input: ["listing-search-input", styles.input],
        results: ["listing-search-results", styles.results]
    });
});

export { IListingSearchClassNames, getClassNames }