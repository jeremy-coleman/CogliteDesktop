import { containsIgnoreCase } from "./StringUtils";
import { isFunction, isObject } from "./LangUtils";

interface IContainsTextOptions {
    matcher: (text: string, match: string) => boolean;
}

const DefaultContainsTextOptions : IContainsTextOptions = {
    matcher: containsIgnoreCase
};

const containsTextImmediate = function(o : any, text : string, matcher : (text: string, match: string) => boolean) : boolean {
    if(o) {
        if(Array.isArray(o) || (o && isFunction(o.some))) {
            return o.some((value : string) => {
                return containsTextImmediate(value, text, matcher);
            });
        }
        
        if(isObject(o)) {
            return Object.keys(o).some((key) => {
                return (o[key] && containsTextImmediate(key, text, matcher)) || containsTextImmediate(o[key], text, matcher);
            });
        }
        
        return matcher(String(o), text);
    }
    return false;
};

const containsText = (o : any, text : string, opts : IContainsTextOptions = DefaultContainsTextOptions) => {
    const matcher = opts.matcher ? opts.matcher : DefaultContainsTextOptions.matcher;
    return containsTextImmediate(o, text, matcher);
};

export { containsText, IContainsTextOptions, DefaultContainsTextOptions };