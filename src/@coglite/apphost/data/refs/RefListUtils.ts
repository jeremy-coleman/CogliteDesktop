import { IRefList } from "./IRefList";
import { IRefListItem } from "./IRefListItem";

const getOptionalRefListItems = (refList: IRefList, sorted: boolean = false) : IRefListItem[] => {
    let r : IRefListItem[] = [{ key: "", text: ""}];
    if(refList.items && refList.items.length > 0) {
        let items = sorted ? refList.itemsSorted : refList.items.slice();
        r = r.concat(items);
    }
    return r;
};

export { getOptionalRefListItems };

