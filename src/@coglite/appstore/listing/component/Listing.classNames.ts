import { memoizeFunction, mergeStyleSets } from 'office-ui-fabric-react';

import { IListingStyles } from './Listing.styles';

interface IListingClassNames {
    root?: string;
    metadata?: string;
    metadataSection?: string;
    metadataSectionTitle?: string;
    metadataSectionContent?: string;
    actions?: string;
    summary?: string;
    title?: string;
    overview?: string;
    shortDescription?: string;
    detailContent?: string;
    detailTabs?: string;
    description?: string;
    banner?: string;
    rating?: string;
    ratingStars?: string;
    reviewCount?: string;
}

const getClassNames = memoizeFunction((styles : IListingStyles, className?: string) => {
    return mergeStyleSets({
        root: ["listing", className, styles.root],
        metadata: ["listing-metadata", styles.metadata],
        metadataSection: ["listing-metadata-section", styles.metadataSection],
        metadataSectionTitle: ["listing-metadata-section-title", styles.metadataSectionTitle],
        metadataSectionContent: ["listing-metadata-section-title", styles.metadataSectionContent],
        detailContent: ["listing-detail-content", styles.detailContent],
        detailTabs: ["listing-detail-tabs", styles.detailTabs],
        overview: ["listing-overview", styles.overview],
        title: ["listing-title", styles.title],
        shortDescription: ["listing-short-description", styles.shortDescription],
        actions: ["listing-actions", styles.actions],
        description: ["listing-description", styles.description],
        banner: ["listing-banner", styles.banner],
        rating: ["listing-rating", styles.rating],
        ratingStars: ["listing-rating-stars", styles.ratingStars],
        reviewCount: ["listing-review-count", styles.reviewCount]
    });
});

export { IListingClassNames, getClassNames }