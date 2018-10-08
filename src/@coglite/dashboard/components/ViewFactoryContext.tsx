import * as React from "react";
import { MappedViewFactory } from "./MappedViewFactory";
import { StackViewFactory } from "./stack";
import { HSplitViewFactory } from "./h-split";
import { VSplitViewFactory } from "./v-split";
import { GridViewFactory } from "./grid";
import { IViewFactory } from "../types/IViewFactory";


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