import * as React from 'react';

import { IViewFactory } from '../types';
import { GridViewFactory } from './grid';
import { HSplitViewFactory } from './h-split';
import { MappedViewFactory } from './MappedViewFactory';
import { StackViewFactory } from './stack';
import { VSplitViewFactory } from './v-split';


const ViewFactoryDefaults = {
    createViewFactory: () => {
        const factory = new MappedViewFactory();
        factory.setFactory("stack", new StackViewFactory());
        factory.setFactory("hsplit", new HSplitViewFactory());
        factory.setFactory("vsplit", new VSplitViewFactory());
        factory.setFactory("grid", new GridViewFactory());
        return factory;
    }
};

// NOTE that this is a react context (not app context)
const ViewFactoryContext = React.createContext<IViewFactory>(ViewFactoryDefaults.createViewFactory());

export { ViewFactoryContext, ViewFactoryDefaults }