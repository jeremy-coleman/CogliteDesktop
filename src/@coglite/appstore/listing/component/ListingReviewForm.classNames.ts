import { memoizeFunction, mergeStyleSets } from 'office-ui-fabric-react';

import { IListingReviewFormStyles } from './ListingReviewForm.styles';

interface IListingReviewFormClassNames {
    root?: string;
    items?: string;
}

const getClassNames = memoizeFunction((styles : IListingReviewFormStyles, className : string) => {
    return mergeStyleSets({
        root: ["listing-review-form", className, styles.root],
        editor: ["listing-review-form-editor", styles.editor],
        actions: ["listing-review-form-actions", styles.actions]
    });
});

export { IListingReviewFormClassNames, getClassNames }