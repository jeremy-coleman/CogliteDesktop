import { memoizeFunction, mergeStyleSets } from 'office-ui-fabric-react';

import { IWindowStyles } from './Window.styles';

interface IWindowClassNames {
    root?: string;
    header?: string;
    titleContainer?: string;
    title?: string;
    actionBar?: string;
    action?: string;
    body?: string;
    resize?: string;
}

const getClassNames = memoizeFunction((styles : IWindowStyles, className?: string) => {
    return mergeStyleSets({
        root: ["window", className, styles.root],
        header: ["window-header", styles.header],
        titleContainer: ["window-title-container", styles.titleContainer],
        title: ["window-title", styles.title],
        actionBar: ["window-action-bar", styles.actionBar],
        action: ["window-action", styles.action],
        body: ["window-body", styles.body],
        resize: ["window-resize", styles.resize]
    });
});

export { IWindowClassNames, getClassNames }