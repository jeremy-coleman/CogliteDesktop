import { ISupplierFunc } from "./ISupplierFunc";
import { IConsumerFunc } from "./IConsumerFunc";

interface IBinding<T = any, V = any> {
    target: T;
    key?: string;
    getter?: string | ISupplierFunc<V>;
    setter?: string | IConsumerFunc<V>;
}

export { IBinding }