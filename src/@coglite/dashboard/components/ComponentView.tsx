import * as React from "react";
import { IComponent } from "../types/IComponent";
import { ViewFactoryContext } from "./ViewFactoryContext";

interface IComponentViewProps {
    component: IComponent;
}

class ComponentView extends React.Component<IComponentViewProps, any> {
    render() {
        return (
            <ViewFactoryContext.Consumer>
                {value =>  value.createView(this.props.component)}
            </ViewFactoryContext.Consumer>
        );
    }
}

export { IComponentViewProps, ComponentView }