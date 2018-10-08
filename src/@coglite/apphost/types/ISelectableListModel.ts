import { IListModel } from "./IListModel";
import ISelectionModel from "./ISelectionModel";

interface ISelectableListModel<T = any> extends IListModel<T> {
    selection: ISelectionModel<T>;
    selectedIndexes: number[];
}

export { ISelectableListModel }