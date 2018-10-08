interface IPredicateFunc<T = any, S = T[]> {
    (value : T, index?: number, source?: S) : boolean;
}

export { IPredicateFunc }