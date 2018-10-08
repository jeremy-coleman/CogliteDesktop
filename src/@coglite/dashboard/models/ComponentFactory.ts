import { IComponent } from "../types/IComponent";
import { IComponentFactory } from "../types/IComponentFactory";
import { window, stack, vsplit, hsplit, grid } from "../types/ComponentTypes";
import { WindowModel } from "./Window";
import { StackModel } from "./Stack";
import { HSplitModel, VSplitModel } from "./Split";
import { GridModel } from "./Grid";

interface IComponentFactoryMap {
    [key : string]: () => IComponent;
}

const ComponentFactoryMap : IComponentFactoryMap = {};
ComponentFactoryMap[window] = () => {
    return new WindowModel();
};
ComponentFactoryMap[stack] = () => {
    return new StackModel();
};
ComponentFactoryMap[hsplit] = () => {
    return new HSplitModel();
};
ComponentFactoryMap[vsplit] = () => {
    return new VSplitModel();
};
ComponentFactoryMap[grid] = () => {
    return new GridModel();   
};

const ComponentFactory : IComponentFactory = (type : string) => {
    const s = ComponentFactoryMap[type];
    if(s) {
        return s();
    }
    throw { code: "NOT_FOUND", type: type, message: `Component Type ${type} is not registered`};
};

export {
    IComponentFactory,
    ComponentFactory,
    IComponentFactoryMap,
    ComponentFactoryMap
}