interface IHistoryEntry<T> {
    timestamp: string;
    value: T;
    [key : string] : any;
}

export { IHistoryEntry as default, IHistoryEntry }