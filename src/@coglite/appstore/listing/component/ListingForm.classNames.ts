import { memoizeFunction, mergeStyleSets } from 'office-ui-fabric-react';

import { IListingFormStyles } from './ListingForm.styles';

interface IListingFormClassNames {
    root?: string;
    editor?: string;
    section?: string;
    sectionTitle?: string;
    sectionBody?: string;
    actions?: string;
}

const getClassNames = memoizeFunction((styles : IListingFormStyles, className?: string) => {
    return mergeStyleSets({
        root: ["listing-form", className, styles.root],
        editor: ["listing-form-editor", styles.editor],
        section: ["listing-form-section", styles.section],
        sectionTitle: ["listing-form-section-title", styles.sectionTitle],
        sectionBody: ["listing-form-section-body", styles.sectionBody],
        actions: ["app-listing-form-actions", styles.actions]
    });
});

export { IListingFormClassNames, getClassNames }