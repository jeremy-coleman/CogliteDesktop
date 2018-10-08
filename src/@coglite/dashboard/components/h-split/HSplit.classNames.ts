import { memoizeFunction, mergeStyleSets } from 'office-ui-fabric-react';

import { IHSplitStyles } from './HSplit.styles';

interface IHSplitClassNames {
    root?: string;
    splitter?: string;
    splitterHandle?: string;
    leftPane?: string;
    leftContent?: string;
    rightPane?: string;
    rightContent?: string;
}

const getClassNames = memoizeFunction((styles : IHSplitStyles, className?: string) => {
    return mergeStyleSets({
        root: ["hsplit", styles.root, className],
        splitter: ["hsplit-splitter", styles.splitter],
        splitterHandle: ["hsplit-splitter-handle", styles.splitterHandle],
        leftPane: ["hsplit-left-pane", styles.leftPane],
        leftContent: ["hsplit-left-content", styles.leftContent],
        rightPane: ["hsplit-right-pane", styles.rightPane],
        rightContent: ["hsplit-right-content", styles.rightContent]
    });
});

export { IHSplitClassNames, getClassNames }