import { IComponent } from "./IComponent";
import { IMutableSync } from "@coglite/apphost";
import { IWindow } from "./IWindow";
import { IDragManager } from "./IDragManager";

interface IDashboard extends IComponent, IDragManager {
    sync: IMutableSync;
    title: string;
    component : IComponent;
    blockSource: IComponent;
    windows : IWindow[];
    
    setTitle(title : string) : void;
    setComponent(component : IComponent) : void;
    componentConfig : any;
    setComponentConfig(componentConfig : any) : void;
    setBlockSource(blockSource : IComponent) : void;
    clearBlockSource() : void;
    clear() : void;
    load() : Promise<any>;
}

export { IDashboard }