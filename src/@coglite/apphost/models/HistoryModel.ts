import { action, observable } from 'mobx';

import { IStorageService, StorageServiceContext } from '../services';
import { IHistoryEntry, IHistoryModel } from '../types';
import { ListModel } from './ListModel';
import { SyncModel } from './SyncModel';

//import { currentTimestampDataText } from "../util/DateUtils";

class HistoryModel<T> extends ListModel<IHistoryEntry<T>> implements IHistoryModel<T> {
    legacyValueProp: string;
    storageKey : string;
    private _service : IStorageService;
    private _limit : number = 100;
    @observable saveSync = new SyncModel();

    get service() {
        return this._service || StorageServiceContext.value;
    }
    set service(value) {
        this._service = value;
    }

    public get limit() {
        return this._limit;
    }
    public set limit(limit : number) {
        if(limit > 0) {
            this._limit = limit;
        }
    }

    @action
    addEntry(value : T) : Promise<any> {
        //this.items.unshift({ value : value, timestamp: currentTimestampDataText() });
        // ensure items loaded
        return this.load().then(() => {
            this.items.unshift({ value : value, timestamp: Date.now().toString() });
            if(this.items.length > this.limit) {
                this.items.splice(this.items.length - 1);
            }
            return this.save();
        });
    }

    private _onSaveDone = () => {
        this.saveSync.syncEnd();
    }

    private _onSaveError = (error : any) => {
        this.saveSync.syncError(error);
        console.log("Error Saving History Entry");
        console.error(error);
    }

    @action
    save(): Promise<any> {
        this.saveSync.syncStart();
        // ensure any history has been loaded
        if(this.items.length === 0) {
            return this.service.removeItem(this.storageKey).then(this._onSaveDone).catch(this._onSaveError);
        }
        return this.service.setItem(this.storageKey, this.items).then(this._onSaveDone).catch(this._onSaveError);
    }

    @action
    clear() {
        super.clear();
        this.save();
    }

    protected _loadImpl() {
        return this.service.getItem(this.storageKey).then(r => {
            if(r) {
                const mapped : IHistoryEntry<T>[] = this.legacyValueProp ? r.map(item => {
                    return { timestamp: item.timestamp, value: item[this.legacyValueProp] || item.value };
                }) : r;
                return mapped;
            }
        });
    }
}

export { HistoryModel as default, HistoryModel };