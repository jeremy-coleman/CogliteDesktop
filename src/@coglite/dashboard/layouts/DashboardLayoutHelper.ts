import { IDashboard } from "../types/IDashboard";
import { IHSplit, IVSplit } from "../types/ISplit";
import * as ComponentTypes from "../types/ComponentTypes";
import { IWindow } from "../types/IWindow";
import { IStack } from "../types/IStack";

const getColumnCount = (dashboard : IDashboard) : number => {
    return dashboard && dashboard.component && dashboard.component.type === ComponentTypes.hsplit ?
            (dashboard.component as IHSplit).columnCount : 0;
}

const getRowCount = (dashboard : IDashboard) : number => {
    return dashboard && dashboard.component && dashboard.component.type === ComponentTypes.vsplit ?
            (dashboard.component as IVSplit).rowCount : 0;
};

const assignWindows = (windows : IWindow[], stacks : IStack[]) => {
    if(windows && windows.length > 0) {
        const stackQuota = Math.ceil(windows.length / stacks.length);
        let stackIdx = 0;
        let c;
        windows.forEach(w => {
            c = stacks[stackIdx];
            if(c.windowCount === stackQuota) {
                stackIdx ++;
                c = stacks[stackIdx];
            }
            c.add(w, false);
        });
        stacks.forEach(c => {
            if(c.windowCount > 0) {
                c.setActiveIndex(0);
            } else {
                c.addNew();
            }
        });
    }
};

export { getColumnCount, getRowCount, assignWindows }