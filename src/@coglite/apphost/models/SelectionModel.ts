import { observable, action, computed } from "mobx";
import {ISelectionModel} from "../types";

class SelectionModel<T> implements ISelectionModel<T> {
    @observable selectedItems: T[] = [];

    @action
    setSelectedItems(selectedItems: T[]) : void {
        this.selectedItems = [];
        if(selectedItems) {
            selectedItems.forEach(item => this.selectedItems.push(item));
        }
    }

    @action
    toggleItem(item : T, selected?: boolean) : void {
        const idx = this.selectedItems.indexOf(item);
        if(idx >= 0) {
            if(!selected) {
                this.selectedItems.splice(idx, 1);
            }
        } else if(selected === undefined || selected) {
            this.selectedItems.push(item);
        }
    }

    @computed
    get selectionCount() : number {
        return this.selectedItems ? this.selectedItems.length : 0;
    }

    @action
    clearSelection() {
        this.selectedItems = [];
    }
}

export { SelectionModel as default, SelectionModel };