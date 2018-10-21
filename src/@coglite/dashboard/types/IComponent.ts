import { IDashboard } from "./IDashboard";
import { IRouter, IRequest } from "@coglite/router";
import { IConsumerFunc } from "@coglite/apphost";
import { IPredicateFunc } from "@coglite/apphost";
import { ISupplierFunc } from "@coglite/apphost";
import { IViewport } from "./IViewport";
import { IPortalManager } from "./IPortalManager";
import { IComponentFactory } from "./IComponentFactory";

//recent change
import * as _ComponentTypes from '../constants/ComponentTypes'
type ComponentTypes = keyof typeof _ComponentTypes

interface IComponent extends IViewport {
    id: string;
    type: any;
    parent: IComponent;
    dashboard: IDashboard;
    root: IComponent;
    config : any;
    router: IRouter;
    isWindowManager: boolean;
    portalManager: IPortalManager;
    componentFactory: IComponentFactory;
    closeDisabled: boolean;
    x: number;
    rx: number;
    y: number;
    ry: number;
    width: number;
    height: number;
    setPortalManager(portalManager : IPortalManager) : void;
    setRouter(router : IRouter) : void;
    addApp: IRequest | ISupplierFunc<IRequest>;
    setAddApp(addApp : IRequest | ISupplierFunc<IRequest>) : void;
    setConfig(state : any) : void;
    remove(comp : IComponent) : void;
    removeFromParent() : void;
    replace(newComp : IComponent, oldComp : IComponent) : void;
    visit(callback : IConsumerFunc<IComponent>) : void;
    findFirst(predicate : IPredicateFunc<IComponent>) : IComponent;
    findAll(predicate : IPredicateFunc<IComponent>) : IComponent[];
    close() : void;
    setCloseDisabled(closeDisabled : boolean) : void;
    /**
     * Resize the viewport
     * @param width
     * @param height 
     */
    resize(width : number, height : number) : void;
    /**
     * Position the viewport
     * @param x
     * @param y 
     */
    position(x : number, y : number) : void;
    /**
     * Sets the viewport relative to the dashboard
     * @param x
     * @param y 
     * @param width 
     * @param height 
     */
    setViewport(x : number, y: number, width : number, height : number) : void;
    /**
     * Resets the viewport on the component
     */
    resetViewport() : void;
}

export { IComponent }