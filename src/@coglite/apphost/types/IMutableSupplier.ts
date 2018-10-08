import { ISupplier } from "./ISupplier";

interface IMutableSupplier<T> extends ISupplier<T> {
    value : T;
    setValue(value: T) : Promise<any> | void;
    clearValue() : void;
}

export { IMutableSupplier }