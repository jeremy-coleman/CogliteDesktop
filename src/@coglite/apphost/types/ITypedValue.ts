interface ITypedValue<V = any> {
    type: string;
    value: V;
}

export { ITypedValue as default, ITypedValue }