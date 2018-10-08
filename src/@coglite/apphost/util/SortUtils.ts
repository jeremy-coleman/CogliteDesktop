import * as StringUtils from "./StringUtils";
import { ISortProps,IKeyMapFunc } from "../types";
import {defaultKeyMap} from '../models'
import { isNumber, isDate, isString, isBoolean, isObject } from "./LangUtils";

const toSortNumber = (o : any) : number => {
    if(isNumber(o)) {
        return o;
    }

    if(isDate(o)) {
        return o.getTime();
    }

    if(isString(o)) {
        return parseInt(o);
    }

    if(isBoolean(o)) {
        return o ? 1 : 0;
    }

    return 0;
};

const toSortString = (o : any) : string => {
    let s;
    if(isString(o)) {
        s = o;
    } else if(isObject(o)) {
        s = String(o);
        if(s === String({})) {
            s = JSON.stringify(o);
        }
    } else {
        s = String(o);
    }

    return s;
};

const compare = (l : any, r : any, sort?: ISortProps) : number => {
    let result;
    
    if(isNumber(l)) {
        result = r !== undefined && r !== null ? l - toSortNumber(r) : 1;
    } else if(isDate(l)) {
        result = r ? (l as Date).getTime() - toSortNumber(r) : 1;
    } else if(isString(l)) {
        result = r !== undefined && r !== null ? (l as string).localeCompare(toSortString(r)) : 1;
    } else if(isBoolean(l)) {
        result = r !== undefined && r !== null ? (l ? 1 : 0) - toSortNumber(r) : 1;
    } else if(isObject(l)) {
        result = r !== undefined && r !== null ? toSortString(l).localeCompare(toSortString(r)) : 1;
    } else {
        result = r ? -1 : 0;
    }

    if(sort && sort.descending) {
        result = 0 - result;
    }

    return result;
};


const sort = <T = any>(items: T[], sort : ISortProps, keyMap : IKeyMapFunc<T, any> = defaultKeyMap) : T[] => {
    return items && sort && StringUtils.isNotBlank(sort.field)
        ? items.sort((a, b) => compare(keyMap(a, sort.field), keyMap(b, sort.field), sort)) : items;
};

export {
    compare,
    sort,
    toSortString,
    toSortNumber
};