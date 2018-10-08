import { IComponent } from "./IComponent";

interface IComponentFactory {
    (type : string) : IComponent;
}

export { IComponentFactory }