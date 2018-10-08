import * as React from "react";
import { IDashboardLayout } from "../types/IDashboardLayout";
import { IDashboard } from "../types/IDashboard";
import { IGrid } from "../types/IGrid";
import { IContextualMenuItem, ContextualMenuItemType } from "office-ui-fabric-react";
import { GridCellSizeSlider } from "../components/grid/GridCellSizeSlider";
import { GridCellMarginSlider } from "../components/grid/GridCellMarginSlider";
import * as ComponentTypes from "../types/ComponentTypes";
import { GridModel } from "../models/Grid";

const applyLayout = (dashboard : IDashboard) => {
    const windows = dashboard.windows;
    const grid = new GridModel();
    dashboard.setComponent(grid);
    windows.forEach(w => grid.add(w));
};

const isLayoutApplied = (dashboard : IDashboard) => {
    return dashboard.component && dashboard.component.type === ComponentTypes.grid;
};


const onRenderGridCellSize = (item : IContextualMenuItem) => {
    const grid = item.grid as IGrid;
    return <GridCellSizeSlider key={item.key} grid={grid} />;
};

const onRenderGridCellMargin = (item : IContextualMenuItem) => {
    const grid = item.grid as IGrid;
    return <GridCellMarginSlider key={item.key} grid={grid} />;
};

const GridDashboardLayout : IDashboardLayout = {
    key: "grid",
    name: "Grid",
    iconProps: { iconName: "GridViewMedium"},
    applyLayout: applyLayout,
    isLayoutApplied: isLayoutApplied,
    createActions(dashboard : IDashboard) {
        const items : IContextualMenuItem[] = [];
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