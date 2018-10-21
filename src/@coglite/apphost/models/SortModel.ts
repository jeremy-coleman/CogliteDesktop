import { action, observable } from 'mobx';

import { ISortModel } from '../types';

class SortModel implements ISortModel {
    @observable field : string;
    @observable descending : boolean = false;

    @action
    setField(field: string) : void {
        this.field = field;
    }

    @action
    setDescending(descending?: boolean) : void {
        this.descending = descending;
    }

    @action
    setSort(field: string, descending?: boolean) : void {
        this.field = field;
        this.descending = descending ? true : false;
    }

    @action
    toggleSort(field: string) : void {
        if(this.field && this.field === field) {
            this.descending = !this.descending;
        } else {
            this.field = field;
            this.descending = false;
        }
    }

    @action
    clear() {
        this.field = undefined;
        this.descending = false;
    }
}

export { SortModel as default, SortModel };