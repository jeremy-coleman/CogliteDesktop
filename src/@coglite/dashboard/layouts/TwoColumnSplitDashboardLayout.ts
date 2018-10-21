import { HSplitModel, StackModel } from '../models';
import { IDashboard, IDashboardLayout } from '../types';
import { assignWindows, getColumnCount } from './DashboardLayoutHelper';


const applyLayout = (dashboard : IDashboard) => {
    const windows = dashboard.windows;
    // create the new containers
    const stacks = [
        new StackModel(),
        new StackModel()
    ];
    const split = new HSplitModel();
    split.setLeft(stacks[0]);
    split.setRight(stacks[1]);
    dashboard.setComponent(split);
    assignWindows(windows, stacks);
};

const isLayoutApplied = (dashboard : IDashboard) => {
    return getColumnCount(dashboard) === 2;
};

const TwoColumnSplitDashboardLayout : IDashboardLayout = {
    key: "twoColumnSplit",
    name: "Two Columns",
    iconProps: { iconName: "DoubleColumn" },
    applyLayout: applyLayout,
    isLayoutApplied: isLayoutApplied
};

export { TwoColumnSplitDashboardLayout }