import * as ComponentTypes from '../../constants/ComponentTypes';
import { GridModel } from '../../models';
import { IDashboard } from '../../types';

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