import { IComponent } from "./IComponent";

interface IComponentRemoveOptions {
    component: IComponent;
    saveHandler?: (component : IComponent) => void;
}

interface IComponentRemove {
    active : boolean;
    component : IComponent;
    init(opts: IComponentRemoveOptions) : void;
    save() : void;
    cancel() : void;
}

export { IComponentRemoveOptions, IComponentRemove }