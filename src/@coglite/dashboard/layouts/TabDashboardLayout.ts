import * as ComponentTypes from '../constants/ComponentTypes';
import { StackModel } from '../models';
import { IDashboard, IDashboardLayout } from '../types';

const applyLayout = (dashboard : IDashboard) => {
    // grab windows
    const windows = dashboard.windows;
    // grab active window
    const active = windows.find(w => w.active);
    const stack = new StackModel();
    dashboard.setComponent(stack);
    windows.forEach(w => {
        stack.add(w);
    });
    if(active) {
        stack.setActive(active);
    } else {
        stack.setActiveIndex(0);
    }
};

const isLayoutApplied = (dashboard : IDashboard) => {
    return dashboard.component && dashboard.component.type === ComponentTypes.stack;
};


const TabDashboardLayout : IDashboardLayout = {
    key: "tabs",
    name: "Tabs",
    iconProps: { iconName: "BrowserTab" },
    applyLayout: applyLayout,
    isLayoutApplied: isLayoutApplied
};

export { TabDashboardLayout }