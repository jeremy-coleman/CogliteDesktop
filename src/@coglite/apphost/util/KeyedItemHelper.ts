import { IKeyedItem } from '../types'

const getItem = <E extends IKeyedItem> (items : E[], key: string) : E => {
    return items ? items.find((e) => {
        return e.key === key || e.keyAliases && e.keyAliases.some((keyAlias) => { return keyAlias === key });
    }) : undefined;
};

export { getItem }