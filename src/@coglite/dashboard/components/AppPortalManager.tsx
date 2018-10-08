import { AppHostContainer } from '@coglite/apphost';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { IPortal } from '../types/IPortal';
import { IPortalManager } from '../types/IPortalManager';
import { IWindow } from '../types/IWindow';
import { Window } from './window';

class AppPortal implements IPortal {
    private _root : HTMLElement;
    private _el : HTMLElement;
    private _window : IWindow;
    private _onDestroy : (window : IWindow) => void;
    constructor(root : HTMLElement, window : IWindow, onDestroy?: (window : IWindow) => void) {
        this._root = root;
        const doc = root.ownerDocument;
        this._el = doc.createElement("div");
        const s = this._el.style;
        s.position = "absolute";
        s.zIndex = "1";
        root.appendChild(this._el);
        this._el.addEventListener("transitionend", this._onTransitionEnd);
        this._window = window;
        this._onDestroy = onDestroy;
        ReactDOM.render(
            <Window window={this._window}>
                <AppHostContainer host={this._window.appHost} />
            </Window>
        , this._el);
    }
    get el() {
        return this._el;
    }
    protected _notifyResize() {
        this._window.appHost.emit({ type: "resize" });
    }
    private _onTransitionEnd = () => {
        this._notifyResize();
    }
    setViewport(left: number, top: number, width: number, height: number) {
        const clientBounds = this._el.getBoundingClientRect();
        const sizeChanged = width !== clientBounds.width || height !== clientBounds.height;
        const visible = width > 0 && height > 0;
        const s = this._el.style;
        s.top = `${visible ? top : -1}px`;
        s.left = `${visible ? left : -1}px`;
        s.bottom = "";
        s.right = "";
        s.width = `${width}px`;
        s.height = `${height}px`;
        s.overflow = "hidden";
        if(sizeChanged) {
            setTimeout(() => {
                this._notifyResize();
            }, 1);
        }
    }
    setZIndex(zIndex : number) {
        this._el.style.zIndex = `${zIndex}`;
    }
    scrollIntoView() {
        try {
            this._el.scrollIntoView();
        } catch(e) {}
    }
    bringToFront() : void {
        this.setZIndex(2);
    }
    bringToBase() : void {
        this.setZIndex(1);
    }
    destroy() {
        ReactDOM.unmountComponentAtNode(this._el);
        this._root.removeChild(this._el);
        if(this._onDestroy) {
            this._onDestroy(this._window);
        }
    }
}

class AppPortalManager implements IPortalManager {
    private _root : HTMLElement;
    private _portalMap : { [key : string] : AppPortal } = {};
    constructor(root : HTMLElement) {
        this._root = root;
    }
    private _onPortalDestroyed = (window : IWindow) => {
        delete this._portalMap[window.id];
    }
    get root() : HTMLElement {
        return this._root;
    }
    getPortal(window : IWindow) {
        let portal = this._portalMap[window.id];
        if(!portal) {
            portal = new AppPortal(this._root, window, this._onPortalDestroyed);
            this._portalMap[window.id] = portal;
        }
        return portal;
    }
    destroyPortal(window : IWindow) {
        const portal = this._portalMap[window.id];
        if(portal) {
            portal.destroy();
        }
    }
    destroy() {
        Object.keys(this._portalMap).forEach(key => {
            this._portalMap[key].destroy();
        });
    }
}

export { AppPortal, AppPortalManager }