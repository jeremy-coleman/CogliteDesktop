//import { grid, hsplit, stack, vsplit, window } from '../constants';
import {ComponentTypes} from '../constants';
import { IComponent, IComponentFactory } from '../types';
import { GridModel } from './Grid';
import { HSplitModel, VSplitModel } from './Split';
import { StackModel } from './Stack';
import { WindowModel } from './Window';

interface IComponentFactoryMap {
    [key : string]: () => IComponent;
}

const ComponentFactoryMap : IComponentFactoryMap = {};
ComponentFactoryMap[ComponentTypes.window] = () => {
    return new WindowModel();
};
ComponentFactoryMap[ComponentTypes.stack] = () => {
    return new StackModel();
};
ComponentFactoryMap[ComponentTypes.hsplit] = () => {
    return new HSplitModel();
};
ComponentFactoryMap[ComponentTypes.vsplit] = () => {
    return new VSplitModel();
};
ComponentFactoryMap[ComponentTypes.grid] = () => {
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