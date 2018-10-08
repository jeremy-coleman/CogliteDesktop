import { observable, action } from "mobx";
import { IMutableSync, ISyncOptions } from "../types";

export class SyncModel<I = any> implements IMutableSync<I> {
    @observable id: I;
    @observable type: any;
    @observable startDate: Date;
    @observable endDate: Date;
    @observable.ref error: any;
    @observable syncing: boolean;
    @observable hasSynced: boolean = false;

    @action
    syncStart(opts?: ISyncOptions) : void {
        this.type = opts ? opts.type : undefined;
        this.id = opts ? opts.id : undefined;
        this.startDate = new Date();
        this.endDate = undefined;
        this.error = undefined;
        this.syncing = true;
    }
    @action
    syncEnd() : void {
        this.hasSynced = true;
        this.endDate = new Date();
        if(!this.startDate) {
            this.startDate = this.endDate;
        }
        this.syncing = false;
    }
    @action
    syncError(error : any) : void {
        this.hasSynced = true;
        this.error = error;
        this.syncEnd();
    }
    @action
    clear() {
        this.type = undefined;
        this.id = undefined;
        this.startDate = undefined;
        this.endDate = undefined;
        this.error = undefined;
        this.syncing = false;
        this.hasSynced = false;
    }
}

