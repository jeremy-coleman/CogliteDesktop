import { IListModel } from "./IListModel";
import { ISortModel } from "./ISortModel";

interface ISortableListModel<T> extends IListModel<T> {
    sort: ISortModel;
}

export { ISortableListModel }