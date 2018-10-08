import { IKeyMapFunc } from'../types'
//import { isValidMoment } from "./MomentUtils";
//import * as moment from "moment";

const defaultKeyMap : IKeyMapFunc = <I = any, O = any>(value, key) => {
    return value ? value[key] : undefined;
};

// const dateString = <I = any>(formats : string[], keyMapFunc?: IKeyMapFunc<I, any>) : IKeyMapFunc<I, Date> => {
//     return (value, key) => {
//         const f = keyMapFunc || defaultKeyMap;
//         const keyValue = f(value, key);
//         if(keyValue !== undefined) {
//             const m = moment(String(keyValue), formats as moment.MomentFormatSpecification, true);
//             return isValidMoment(m) ? m.toDate() : undefined;
//         }
//     };
// };

const mapped = <I = any, O = any>(map : { [key : string] : IKeyMapFunc<I, O>}) : IKeyMapFunc<I, O> => {
    return (value, key) => {
        return (map[key] || defaultKeyMap)(value, key);
    };
};

export {
    defaultKeyMap,
    //dateString,
    mapped
}