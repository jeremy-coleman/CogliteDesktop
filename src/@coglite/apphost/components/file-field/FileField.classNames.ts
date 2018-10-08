import { memoizeFunction, mergeStyleSets } from 'office-ui-fabric-react';

import { IFileFieldStyles } from './FileField.styles';

interface IFileFieldClassNames {
    root?: string;
    wrapper?: string;
    selector?: string;
    selectorAction?: string;
    clearAction?: string;
}

const getClassNames = memoizeFunction((styles : IFileFieldStyles, className : string) => {
    return mergeStyleSets({
        root: ["file-field", className, styles.root],
        wrapper: ["file-field-wrapper", styles.wrapper],
        selector: ["file-field-selector", styles.selector],
        selectorAction: ["file-field-selector-action", styles.selectorAction],
        clearAction: ["field-field-clear-action", styles.clearAction]
    });
});

export { IFileFieldClassNames, getClassNames }