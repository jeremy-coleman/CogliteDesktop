import { IWindow } from "./IWindow";
import { IComponent } from "./IComponent";
import { IRequest } from "@coglite/router";
import { IWindowSettings } from "./IWindowSettings";
import { IDragManager } from "./IDragManager";
import { WindowResizeType } from "./WindowResizeType";

interface IWindowManager extends IComponent, IDragManager {
    first : IWindow;
    last : IWindow;
    windowCount : number;
    windows: IWindow[];
    windowSettings: IWindowSettings;
    resizing: IWindow;
    maximized: IWindow;
    maximizedIndex: number;
    resizeType: WindowResizeType;
    isRequiresOverflow: boolean;
    add(win : IWindow, opts? : any) : void;
    addNew(opts?: any) : void;
    open(request : IRequest) : Promise<IWindow>;
    resizeStart(win : IWindow, type : WindowResizeType) : void;
    resizeEnd();
    setMaximized(window : IWindow) : void;
    setMaximizedIndex(maximizedIndex : number) : void;
}

export { IWindowManager }