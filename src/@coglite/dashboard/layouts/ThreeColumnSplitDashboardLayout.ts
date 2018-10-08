import { IDashboardLayout } from "../types/IDashboardLayout";
import { IDashboard } from "../types/IDashboard";
import { assignWindows, getColumnCount } from "./DashboardLayoutHelper";

import { StackModel, HSplitModel  } from "../models";

const applyLayout = (dashboard : IDashboard) => {
    const windows = dashboard.windows;
    const stacks = [
        new StackModel(),
        new StackModel(),
        new StackModel()
    ];
    const outerSplit = new HSplitModel();
    outerSplit.setOffset(0.33);
    const innerSplit = new HSplitModel();
    outerSplit.setLeft(stacks[0]);
    outerSplit.setRight(innerSplit);
    innerSplit.setLeft(stacks[1]);
    innerSplit.setRight(stacks[2]);
    dashboard.setComponent(outerSplit);
    assignWindows(windows, stacks);
};

const isLayoutApplied = (dashboard : IDashboard) => {
    return getColumnCount(dashboard) === 3;
};

const ThreeColumnSplitDashboardLayout : IDashboardLayout = {
    key: "threeColumnSplit",
    name: "Three Columns",
    iconProps: { iconName: "TripleColumn" },
    applyLayout: applyLayout,
    isLayoutApplied: isLayoutApplied
};

export { ThreeColumnSplitDashboardLayout }