import { IPredicateFunc } from "../types";

const not = <T = any>(pr : IPredicateFunc<T>) : IPredicateFunc<T> => {
    return (value, idx, source) => {
        return !pr(value, idx, source);
    };
};

const and = <T = any>(...prs : IPredicateFunc<T>[]) : IPredicateFunc<T> => {
    return (value, idx, source) => {
        return prs.every(pr => {
            return pr(value, idx, source);
        });
    };
};

const or = <T = any>(...prs : IPredicateFunc<T>[]) : IPredicateFunc<T> => {
    return (value, idx, source) => {
        return prs.some(pr => {
            return pr(value, idx, source);
        });
    };
};

export { not, and, or }