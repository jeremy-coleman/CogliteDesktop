import { IPortal } from "./IPortal";
import { IWindow } from "./IWindow";

interface IPortalManager {
    getPortal(window : IWindow) : IPortal;
    destroyPortal(window : IWindow) : void;
    destroy() : void;
}

export { IPortalManager }