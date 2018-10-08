import { observable, action, computed } from "mobx";
import { IListModel } from '../types'
import { SyncModel, } from "./SyncModel";
import { toPromise, } from "./SyncUtils";


class ListModel<T = any> implements IListModel<T> {
    @observable sync = new SyncModel();
    @observable private _total : number;
    @observable items: T[] = [];
    loader : () => Promise<any>;

    constructor(items?: T[]) {
        this.setItems(items);
    }

    @computed
    get total() : number {
        return this._total !== undefined ? this._total : this.items ? this.items.length : 0;
    }
    set total(value) {
        this.setTotal(value);
    }
    @action
    setTotal(total : number) {
        this._total = total;
    }

    @action
    setItems(items: T[]) : void {
        this.items = [];
        if(items) {
            items.forEach(item => this.items.push(item));
        }
    }

    @action
    setValue(value) {
        this.setItems(value);
    }

    @action
    clearItems() : void {
        this.setItems([]);
    }

    @action
    clearValue() {
        this.clearItems();
    }

    @action
    protected _addItemInternal(item : T, atIndex?: number) {
        if(atIndex !== undefined && (atIndex >= 0 || atIndex < this.items.length - 1)) {
            this.items.splice(atIndex, 0, item);
        } else {
            this.items.push(item);
        }
    }

    @action
    addItem(item : T, atIndex?: number) : void {
        if(atIndex >= 0 || atIndex < this.items.length - 1) {
            this.items.splice(atIndex, 0, item);
        } else {
            this.items.push(item);
        }
    }

    @action
    addItems(items : T[], atIndex?: number) : void {
        if(items) {
            items.forEach((item, idx) => {
                this.addItem(item, atIndex >= 0 ? atIndex + idx : undefined);
            });
        }
    }

    @computed
    get itemsView() {
        return this.items.slice(0);
    }

    @computed
    get value() {
        return this.itemsView;
    }

    @action
    clear() {
        this.setItems([]);
        this.sync.clear();
    }

    @action
    protected _loadDone(r : any) {
        // by default it assumes the result from load is an array
        this.setItems(r as T[]);
    }

    @action
    protected _onLoadDone = (r) => {
        this._loadDone(r);
        this.sync.syncEnd();
    }

    @action
    protected _loadError(error : any) {
        this.clearItems();
        this.sync.syncError(error);
    }

    @action
    protected _onLoadError = (error : any) => {
        return this._loadError(error);
    }

    protected _loadImpl() : Promise<any> {
        if(this.loader) {
            return this.loader();
        }
        return Promise.reject({ code: "NOT_IMPLEMENTED", message: "_loadImpl() not implemented"});
    }

    @action
    refresh() : Promise<void> {
        if(this.sync.syncing) {
            return toPromise(this.sync);
        }
        this.sync.syncStart();
        return this._loadImpl().then(this._onLoadDone).catch(this._onLoadError);
    }

    @action
    load() : Promise<void> {
        if(this.sync.syncing) {
            return toPromise(this.sync);
        }
        if(!this.sync.hasSynced || this.sync.error) {
            return this.refresh();
        }
        return Promise.resolve();
    }
}

export { ListModel as default, ListModel };
