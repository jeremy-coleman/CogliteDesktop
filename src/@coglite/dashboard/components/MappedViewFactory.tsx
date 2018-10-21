import * as React from 'react';

import { IComponent, IViewFactory } from '../types';

class MappedViewFactory implements IViewFactory {
    private _map : { [key : string] : IViewFactory } = {};
    setFactory(type : string, factory : IViewFactory) {
        if(type && factory) {
            this._map[type] = factory;
        }
    }
    createView(comp : IComponent) : React.ReactNode {
        const factory = this._map[comp.type];
        return factory ? factory.createView(comp) : null;
    }
}

export { MappedViewFactory }