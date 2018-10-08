import { IPredicateFunc, IMapFunc, IConsumerFunc} from "../types";

interface IStringService {
    empty: string;
    each(text : string, cb : IConsumerFunc<string, string>) : void;
    forEach(text : string, cb : IConsumerFunc<string, string>) : void;
    eachRtl(text : string, cb : IConsumerFunc<string, string>) : void;
    forEachRtl(text : string, cb : IConsumerFunc<string, string>) : void;
    eachReverse(text : string, cb : IConsumerFunc<string, string>) : void;
    forEachReverse(text : string, cb : IConsumerFunc<string, string>) : void;
    some(text : string, cb : IPredicateFunc<string, string>) : boolean;
    someRtl(text : string, cb : IPredicateFunc<string, string>) : boolean;
    someReverse(text : string, cb : IPredicateFunc<string, string>) : boolean;
    every(text : string, cb : IPredicateFunc<string, string>) : boolean;
    everyRtl(text : string, cb : IPredicateFunc<string, string>) : boolean;
    everyReverse(text : string, cb : IPredicateFunc<string, string>) : boolean;
    filter(text : string, pr : IPredicateFunc<string, string>) : string;
    reject(text : string, pr : IPredicateFunc<string, string>) : string;
    map(text : string, m : IMapFunc<string, string, string>) : string;
    split(text : string, pr : IPredicateFunc<string, string>) : string[];
    removeWhitespace(text : string) : string;
    findIndexOf(text : string, pr : IPredicateFunc<string, string>) : number;
    findLastIndexOf(text : string, pr : IPredicateFunc<string, string>) : number;
    leftTrim(text : string) : string;
    trimLeft(text : string) : string;
    rightTrim(text : string) : string;
    trimRight(text : string) : string;
    trim(text : string) : string;
    isBlank(text : string) : boolean;
    isNotBlank(text : string) : boolean;
    startsWith(text : string, match : string) : boolean;
    startsWithIgnoreCase(text : string, match : string) : boolean;
    endsWith(text : string, match : string) : boolean;
    endsWithIgnoreCase(text : string, match : string) : boolean;
    contains(text : string, match : string) : boolean;
    containsIgnoreCase(text : string, match : string) : boolean;
    equalsIgnoreCase(text : string, match : string) : boolean;
    padLeft(text : string, length : number, padChar?: string) : string;
    leftPad(text : string, length : number, padChar?: string) : string;
    stripLeft(text : string, stripChar : string) : string;
    leftStrip(text : string, stripChar : string) : string;
    padRight(text : string, length : number, padChar?: string) : string;
    rightPad(text : string, length : number, padChar?: string) : string;
    stripRight(text : string, stripChar : string) : string;
    rightStrip(text : string, stripChar : string) : string;
    joinStrings<T = any>(items : T[], textMap: IMapFunc<T, string>, separator?: string) : string;
    capitalizeFirstLetter(text : string) : string;
    wordsToCamelCase(text : string) : string;
}

export { IStringService }