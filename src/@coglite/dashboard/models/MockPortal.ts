import { IPortal } from "../types/IPortal";
import { IPortalManager } from "../types/IPortalManager";
import { IWindow } from "../types/IWindow";

export class MockPortal implements IPortal {
    window: IWindow;
    x: number;
    y: number;
    width: number;
    height: number
    destroyed: boolean = false;
    scrolledIntoView: boolean = false;
    zIndex: number = 1;
    constructor(window : IWindow) {
        this.window = window;
    }
    setViewport(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    scrollIntoView() : void {
        this.scrolledIntoView = true;
    }
    bringToFront() : void {
        this.zIndex = 2;
    }
    bringToBase() : void {
        this.zIndex = 1;
    }
    destroy() {
        this.destroyed = true;
    }
}

export class MockPortalManager implements IPortalManager {
    portals : MockPortal[] = [];
    getPortal(window : IWindow) {
        let p = this.portals.find(p => p.window === window);
        if(!p) {
            p = new MockPortal(window);
            this.portals.push(p);
        }
        return p;
    }
    destroyPortal(window : IWindow) {
        const idx = this.portals.findIndex(p => p.window === window);
        if(idx >= 0) {
            const p = this.portals[idx];
            p.destroy();
            this.portals.splice(idx, 1);
        }
    }
    destroy() {
        this.portals.forEach(p => p.destroy());
    }
}

