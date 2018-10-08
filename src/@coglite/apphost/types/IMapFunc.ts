interface IMapFunc<I = any, O = any, S = I[]> {
    (value : I, index?: number, source?: S) : O;
}

export { IMapFunc }