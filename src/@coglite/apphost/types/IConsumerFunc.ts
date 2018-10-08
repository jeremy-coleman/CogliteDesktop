interface IConsumerFunc<T = any, S = T[]> {
    (value : T, index?: number, source?: S) : void;
}

export { IConsumerFunc }