import { memoizeFunction, mergeStyleSets } from 'office-ui-fabric-react';

import { IStackStyles } from './Stack.styles';

interface IStackClassNames {
    root?: string;
    header?: string;
    tabBar?: string;
    actionBar?: string;
    action?: string;
    actionIcon?: string;
    addAction?: string;
    tab?: string;
    tabActive?: string;
    tabTitleContainer?: string;
    tabTitle?: string;
    tabActionBar?: string;
    tabAction?: string;
    tabActionIcon?: string;
    tabPanel?: string;
    body?: string;
    dragOverlay?: string;
    dragFeedbackContainer?: string;
    dragFeedback?: string;
}

const getClassNames = memoizeFunction((styles : IStackStyles, className?: string) => {
    return mergeStyleSets({
        root: ["stack", className, styles.root],
        header: ["stack-header", styles.header],
        tabBar: ["stack-tab-bar", styles.tabBar],
        actionBar: ["stack-action-bar", styles.actionBar],
        action: ["stack-action", styles.action],
        actionIcon: ["stack-action-icon", styles.actionIcon],
        addAction: ["stack-add-action", styles.addAction],
        tab: ["stack-tab", styles.tab],
        tabTitleContainer: ["stack-tab-title-container", styles.tabTitleContainer],
        tabTitle: ["stack-tab-title", styles.tabTitle],
        tabActionBar: ["stack-tab-action-bar", styles.tabActionBar],
        tabAction: ["stack-tab-action", styles.tabAction],
        tabActionIcon: ["stack-tab-action-icon", styles.tabActionIcon],
        tabPanel: ["stack-tab-panel", styles.tabPanel],
        body: ["stack-body", styles.body],
        dragOverlay: ["stack-drag-overlay", styles.dragOverlay],
        dragFeedbackContainer: ["stack-drag-feedback-container", styles.dragFeedbackContainer],
        dragFeedback: ["stack-drag-feedback", styles.dragFeedback]
    });
});

export { IStackClassNames, getClassNames }