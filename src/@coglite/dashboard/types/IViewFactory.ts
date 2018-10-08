import { IComponent } from "./IComponent";

interface IViewFactory {
    createView(comp : IComponent) : React.ReactNode;
}

export { IViewFactory }