
//IMPORTANT!!!
//some wierd bug where if this placed inside the io folder, code compiles but will have an error for model.context is not a constructor 
// in the case when it WAS in the io folder, the error only occured for the StorageService context and..
// using import {Context} from '../models' would give an error but not if you import {Context} from './models/io'
// WHATS REALLY WEIRD is other context providers like Host, router, and config would NOT give an error importing from only './models' (not ./models/io)

import { IMutableSupplier, ISupplierFunc } from '../types'

export interface IContextOptions<T> {
    id?: string;
    value?: T;
    factory?: ISupplierFunc<T>;
}

export class Context<T> implements IMutableSupplier<T> {
    private _id : string;
    private _origValue : T;
    private _value : T;
    private _factory : () => T;
    constructor(opts?: IContextOptions<T>) {
        this._id = opts ? opts.id : undefined;
        this._origValue = opts ? opts.value : undefined;
        this._value = opts ? opts.value : undefined;
        this._factory = opts ? opts.factory : undefined;
    }
    get id() {
        return this._id;
    }
    get value() : T {
        if(!this._value) {
            if(!this._origValue && this._factory) {
                this._origValue = this._factory();
            }
            this._value = this._origValue;
        }
        return this._value;
    }
    set value(value : T) {
        this.setValue(value);
    }
    setValue(value : T) {
        this._value = value;
    }
    clearValue() {
        this._value = undefined;
    }
    get factory() : ISupplierFunc<T> {
        return this._factory;
    }
    set factory(value) {
        this.setFactory(value)
    }
    setFactory(factory : ISupplierFunc<T>) {
        if(factory !== this._factory) {
            this._factory = factory;
            if(this._factory) {
                this.clearValue();
            }
        }
    }
}

export default Context
//export { IContextOptions, Context };