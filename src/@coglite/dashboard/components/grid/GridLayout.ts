import { GridModel } from '../../models';
import * as ComponentTypes from '../../types/ComponentTypes';
import { IDashboard } from '../../types/IDashboard';

const applyLayout = (dashboard : IDashboard) => {
    const windows = dashboard.windows;
    const grid = new GridModel();
    dashboard.setComponent(grid);
    windows.forEach(w => grid.add(w));
};

const isLayoutApplied = (dashboard : IDashboard) => {
    return dashboard.component && dashboard.component.type === ComponentTypes.grid;
};

export { applyLayout, isLayoutApplied }