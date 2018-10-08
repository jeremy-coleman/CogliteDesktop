import { IRefListItem } from "./IRefListItem";

interface IRefList {
    getItemByKey(key: string, defaultValue?: IRefListItem) : IRefListItem;
    items: IRefListItem[];
    itemsSorted: IRefListItem[];
}

export { IRefList };