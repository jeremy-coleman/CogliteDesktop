import { IReactionDisposer, observable, reaction, toJS } from 'mobx';

import { SyncModel } from './SyncModel';
import { SyncSupplier } from './SyncSupplier';

const Defaults = {
    saveDelay: 1000,
    saveSetValue: false
}

class AutoSaveSyncSupplier<T = any> extends SyncSupplier<T> {
    @observable saveSync = new SyncModel();
    saver : (value : T) => Promise<T>;
    private _saveDelay: number;
    private _saveSetValue : boolean;
    private _saveDisposer : IReactionDisposer;

    get saveDelay() {
        return this._saveDelay !== undefined ? this._saveDelay : Defaults.saveDelay;
    }
    set saveDelay(value) {
        if(value >= 0) {
            this._saveDelay = value;
        }
    }

    get saveSetValue() {
        return this._saveSetValue !== undefined ? this._saveSetValue : Defaults.saveSetValue
    }
    set saveSetValue(value) {
        this._saveSetValue = value;
    }

    protected _onSaveDone(value : T) {
        if(this.saveSetValue) {
            this.setValue(value);
        }
        this.saveSync.syncEnd();
    }

    private _onSaveDoneHandler = (value : T) => {
        this._onSaveDone(value);
    }

    protected _onSaveError(error : any) {
        this.saveSync.syncError(error);
    }

    private _onSaveErrorHandler = (error : any) => {
        this._onSaveError(error);
    }

    protected _saveImpl(value : T) : Promise<T> {
        if(this.saver) {
            return this.saver(value);
        }
        return Promise.reject({ code: "ILLEGAL_STATE", message: "A saver is not configured"});
    }

    protected save(value : T) {
        this.saveSync.syncStart();
        return this._saveImpl(value).then(this._onSaveDoneHandler).catch(this._onSaveErrorHandler);
    }

    protected _onSave = () => {
        this.save(this.value);
    }

    protected _attachSaver() {
        if(this.saver && !this._saveDisposer) {
            this._saveDisposer = reaction(() => {
                return toJS(this.value);
            }, this._onSave, { delay: this.saveDelay });
        }
    }

    protected _loadDone(value : T) {
        super._loadDone(value);
        this._attachSaver();
    }
}

export { AutoSaveSyncSupplier }