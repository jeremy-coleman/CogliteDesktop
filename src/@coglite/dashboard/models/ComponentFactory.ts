import { grid, hsplit, stack, vsplit, window } from '../constants/ComponentTypes';
import { IComponent, IComponentFactory } from '../types';
import { GridModel } from './Grid';
import { HSplitModel, VSplitModel } from './Split';
import { StackModel } from './Stack';
import { WindowModel } from './Window';

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