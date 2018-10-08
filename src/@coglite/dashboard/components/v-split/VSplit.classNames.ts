import { memoizeFunction, mergeStyleSets } from 'office-ui-fabric-react';

import { IVSplitStyles } from './VSplit.styles';

interface IVSplitClassNames {
    root?: string;
    splitter?: string;
    splitterHandle?: string;
    topPane?: string;
    topContent?: string;
    bottomPane?: string;
    bottomContent?: string;
}

const getClassNames = memoizeFunction((styles : IVSplitStyles, className?: string) => {
    return mergeStyleSets({
        root: ["vsplit", styles.root, className],
        splitter: ["vsplit-splitter", styles.splitter],
        splitterHandle: ["vsplit-splitter-content", styles.splitterHandle],
        topPane: ["vsplit-top-pane", styles.topPane],
        topContent: ["vsplit-top-content", styles.topContent],
        bottomPane: ["vsplit-bottom-pane", styles.bottomPane],
        bottomContent: ["vsplit-bottom-content", styles.bottomContent]
    })
});

export { IVSplitClassNames, getClassNames }