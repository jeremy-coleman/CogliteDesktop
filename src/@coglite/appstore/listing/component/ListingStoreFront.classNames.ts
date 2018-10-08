import { memoizeFunction, mergeStyleSets } from 'office-ui-fabric-react';

import { IListingStoreFrontStyles } from './ListingStoreFront.styles';

interface IListingStoreFrontClassNames {
    root?: string;
    header?: string;
    searchInputContainer?: string;
    body?: string;
    section?: string;
    sectionHeader?: string;
    sectionTitle?: string;
    sectionBody?: string;
}

const getClassNames = memoizeFunction((styles : IListingStoreFrontStyles, className?: string) => {
    return mergeStyleSets({
        root: ["listing-store-front", className, styles.root],
        header: ["listing-store-front-header", styles.header],
        searchInputContainer: ["listing-store-front-search-input-container", styles.searchInputContainer],
        body: ["listing-store-front-body", styles.body],
        section: ["listing-store-front-section", styles.section],
        sectionHeader: ["listing-store-front-section-header", styles.sectionHeader],
        sectionTitle: ["listing-store-front-section-title", styles.sectionTitle],
        sectionBody: ["listing-store-front-section-body", styles.sectionBody]
    });
});

export { IListingStoreFrontClassNames, getClassNames }