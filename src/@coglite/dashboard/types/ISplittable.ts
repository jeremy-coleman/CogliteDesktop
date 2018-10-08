import { IComponent } from "./IComponent";

interface ISplittable {
    splitLeft(newComp?: IComponent) : void;
    splitRight(newComp?: IComponent) : void;
    splitTop(newComp?: IComponent) : void;
    splitBottom(newComp?: IComponent) : void;
}

export { ISplittable }