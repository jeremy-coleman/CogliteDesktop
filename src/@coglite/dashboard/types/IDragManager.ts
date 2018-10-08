import { IWindow } from "./IWindow";

interface IDragManager {
    drag: IWindow;
    dragStart(drag : IWindow) : void;
    dragEnd() : void;
}

export { IDragManager }