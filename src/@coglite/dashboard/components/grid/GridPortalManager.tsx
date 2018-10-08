import { IGrid, IPortal, IPortalManager, IWindow } from '../../types';
import { AppPortal } from '../AppPortalManager';

interface IGridPortalOptions {
    portalClassName?: string;
}

class GridPortal implements IPortal {
    private _grid : IGrid;
    private _window : IWindow;
    private _onDestroy : (window : IWindow) => void;
    private _opts : IGridPortalOptions;
    private _decorated : boolean = false;
    private _delegate : AppPortal;
    constructor(grid : IGrid, window : IWindow, opts : IGridPortalOptions, onDestroy?: (window : IWindow) => void) {
        this._grid = grid;
        this._window = window;
        this._onDestroy = onDestroy;
        this._opts = opts;
    }
    get grid() {
        return this._grid;
    }
    get delegate() : AppPortal {
        if(!this._delegate) {
            this._delegate = this._grid.parent && this._grid.parent.portalManager ? this._grid.parent.portalManager.getPortal(this._window) as AppPortal : undefined;
        }
        return this._delegate;
    }
    setViewport(left: number, top: number, width: number, height: number) {
        const delegate = this.delegate;
        if(delegate) {
            this.decorate();
            delegate.setViewport(left, top, width, height);
        }
    }
    scrollIntoView() {
        const delegate = this.delegate;
        if(delegate) {
            delegate.scrollIntoView();
        }
    }
    bringToFront() {
        const delegate = this.delegate;
        if(delegate) {
            delegate.bringToFront();
        }
    }
    bringToBase() {
        const delegate = this.delegate;
        if(delegate) {
            delegate.bringToBase();
        }
    }
    decorate() {
        if(!this._decorated) {
            this._decorated = true;
            const delegate = this.delegate;
            if(this._opts && this._opts.portalClassName) {
                const classNames = this._opts.portalClassName.split(" ");
                classNames.forEach(cn => delegate.el.classList.add(cn));
            }
        }
    }
    cleanup() {
        if(this._delegate && this._opts && this._opts.portalClassName) {
            const classNames = this._opts.portalClassName.split(" ");
            classNames.forEach(cn => this._delegate.el.classList.remove(cn));
        }
    }
    destroy() {
        if(this._onDestroy) {
            this._onDestroy(this._window);
        }
        if(this._delegate) {
            this._delegate.destroy();
        }
    }
}

class GridPortalManager implements IPortalManager {
    private _grid : IGrid;
    private _portalOpts : IGridPortalOptions;
    private _portalMap : { [key : string] : GridPortal } = {};
    constructor(grid : IGrid, portalOpts?: IGridPortalOptions) {
        this._grid = grid;
        this._portalOpts = portalOpts;
    }
    private _onPortalDestroyed = (window : IWindow) => {
        delete this._portalMap[window.id];
    }
    get grid() {
        return this._grid;
    }
    getPortal(window : IWindow) {
        let portal = this._portalMap[window.id];
        if(!portal) {
            portal = new GridPortal(this._grid, window, this._portalOpts, this._onPortalDestroyed);
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
    cleanup() {
        Object.keys(this._portalMap).forEach(key => {
            this._portalMap[key].cleanup();
        });
    }
    destroy() {
        Object.keys(this._portalMap).forEach(key => {
            this._portalMap[key].destroy();
        });
    }
}

export { IGridPortalOptions, GridPortal, GridPortalManager }