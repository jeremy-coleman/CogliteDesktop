import { memoizeFunction, mergeStyleSets } from 'office-ui-fabric-react';

import { IListingLinkFormStyles } from './ListingLinkForm.styles';

interface IListingLinkFormClassNames {
    root?: string;
    editor?: string;
    editors?: string;
    nameField?: string;
    urlField?: string;
    removeAction?: string;
    actions?: string;
}

const getClassNames = memoizeFunction((styles : IListingLinkFormStyles, className?: string) => {
    return mergeStyleSets({
        root: ["listing-link-form", styles.root, className],
        editor: ["listing-link-form-editor", styles.editor],
        editors: ["listing-link-form-editors", styles.editors],
        nameField: ["listing-link-form-name-field", styles.nameField],
        urlField: ["listing-link-form-url-field", styles.urlField],
        removeAction: ["listing-link-form-remove-action", styles.removeAction],
        actions: ["app-listing-link-form-actions", styles.actions]
    });
});

export { IListingLinkFormClassNames, getClassNames }