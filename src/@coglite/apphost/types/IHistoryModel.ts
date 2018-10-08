import IHistoryEntry from "./IHistoryEntry";
import { IListModel } from "./IListModel";
import { ISyncModel } from "./ISyncModel";

interface IHistoryModel<T> extends IListModel<IHistoryEntry<T>> {
    saveSync : ISyncModel;
    save() : Promise<any>;
    load() : Promise<any>;
    addEntry(value : T) : Promise<any>;
}

export { IHistoryModel as default, IHistoryModel }