import { IComponent } from '../types';

const dashboard = "dashboard";
const dashboardList = "dashboardList";
const stack = "stack";
const grid = "grid";
const hsplit = "hsplit";
const vsplit = "vsplit";
const window = "window";

const isSplit = (comp : IComponent) => {
    return comp && (comp.type === hsplit || comp.type === vsplit);
};

export let ComponentTypes = {
    dashboard, 
    dashboardList,
    stack,
    grid,
    hsplit,
    vsplit,
    window,
    isSplit
}
