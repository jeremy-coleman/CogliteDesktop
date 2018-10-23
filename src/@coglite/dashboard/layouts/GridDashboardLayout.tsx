import { ContextualMenuItemType } from 'office-ui-fabric-react';

import * as React from 'react';
import { GridCellMarginSlider, GridCellSizeSlider } from '../components/grid';
import {ComponentTypes} from '../constants';
import { GridModel } from '../models/Grid';
import { IDashboard, IDashboardLayout, IGrid } from '../types';

const applyGridLayout = (dashboard : IDashboard) => {
    const windows = dashboard.windows;
    const grid = new GridModel();
    dashboard.setComponent(grid);
    windows.forEach(w => grid.add(w));
};

const isGridLayoutApplied = (dashboard : IDashboard) => {
    return dashboard.component && dashboard.component.type === ComponentTypes.grid;
};


const onRenderGridCellSize = (item : any) => {
    const grid = item.grid as IGrid;
    return <GridCellSizeSlider key={item.key} grid={grid} />;
};

const onRenderGridCellMargin = (item : any) => {
    const grid = item.grid as IGrid;
    return <GridCellMarginSlider key={item.key} grid={grid} />;
};

const GridDashboardLayout : IDashboardLayout = {
    key: "grid",
    name: "Grid",
    iconProps: { iconName: "GridViewMedium"},
    applyLayout: applyGridLayout,
    isLayoutApplied: isGridLayoutApplied,
    createActions(dashboard : IDashboard) {
        const items : any[] = [];
        const grid = dashboard.component as IGrid;
        // this is the grid settings icon
        items.push(
            {
                key: "settings",
                iconProps: {
                    iconName: "Equalizer"
                },
                subMenuProps: {
                    items: [
                        {
                            key: "gridCellSizeHeader",
                            itemType: ContextualMenuItemType.Header,
                            name: "Cell Size"
                        },
                        {
                            key: "gridCellSize",
                            name: "Cell Size",
                            grid: grid,
                            onRender: onRenderGridCellSize
                        },
                        {
                            key: "gridCellMarginHeader",
                            itemType: ContextualMenuItemType.Header,
                            name: "Cell Margin"
                        },
                        {
                            key: "gridCellMargin",
                            name: "Cell Margin",
                            grid: grid,
                            onRender: onRenderGridCellMargin
                        }
                    ]
                }
            }
        );
        
        if(grid.addApp) {
            items.push(
                {
                    key: "add",
                    name: "Add",
                    iconProps: {
                        iconName: "Add"
                    },
                    onClick() {
                        grid.addNew();
                    }
                }
            );
        }
        return items;
    }
};

export { GridDashboardLayout }