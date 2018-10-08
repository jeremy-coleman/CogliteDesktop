export interface IKeyValuePair<K = any, V = any> {
    key: K,
    value: V
};


export interface IKeyMapFunc<I = any, O = any> {
    (value : I, key : string | number) : O;
}

export interface IKeyedValue<K, V> {
    key: K;
    value: V;
}

export interface IKeyedItem {
    key: string;
    keyAliases?: string[];
    [field : string]: any;
}


export interface IKeyedTextItem extends IKeyedItem {
    text: string;
}

export interface IOption extends IKeyedItem {
    text: string;
}