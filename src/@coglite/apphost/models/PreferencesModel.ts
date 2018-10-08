import { observable, action, computed } from "mobx";
import { SyncModel } from "./SyncModel";
import { IStorageService, StorageServiceContext} from "../services";



interface IPreferencesModel {
    get(key: string): any;
    set(key: string, value: any): void;
    has(key: string): boolean;
    delete(key: string): boolean;
    hasPrefs(): boolean;
}


class PreferencesModel implements IPreferencesModel {

    private _rootKey: string;
    @observable private _sync = new SyncModel();
    @observable private _prefs = observable.map();

    protected _storageService : IStorageService;

    constructor(rootKey: string) {
        this._rootKey = rootKey;
        this._init();
    }

    @computed
    protected get storageKey() {
        return `coglite-prefs-${this._rootKey}`
    }

    hasPrefs(): boolean {
        return this._prefs.size > 0;
    }

    get(key: string): any {
        return this._prefs.get(key);
    }

    @action
    set(key: string, value: any): void {
        this._prefs.set(key, value);
    }

    has(key: string): boolean {
        return this._prefs.has(key);
    }

    @action
    delete(key: string): boolean {
        return this._prefs.delete(key);
    }

    get storageService() {
        return this._storageService || StorageServiceContext.value;
    }

    @action
    _init() : Promise<any> {
        if(!this._sync.syncing && !this._sync.hasSynced) {
            this._sync.syncStart();
            return this.storageService.getItem(this.storageKey)
                .then((data : any) => {
                    let entries = data;
                    if (!entries) {
                        entries = [];
                        this.storageService.setItem(this.storageKey, entries);
                    }
                    this._prefs.replace(entries);
                    this._sync.syncEnd();
                    this._prefs.observe((changes) => {
                        this.storageService.setItem(this.storageKey, this._prefs.entries());
                    });
                })
                .catch((error : any) => {
                    this._sync.syncError(error);
                });
        }
        return Promise.resolve();
    }
}

export { PreferencesModel as default, PreferencesModel, IPreferencesModel }