import { IMutableSupplier } from "./IMutableSupplier";
import { ISyncModel } from "./ISyncModel";

interface ISyncSupplier<T> extends IMutableSupplier<T> {
    sync: ISyncModel;
    load() : Promise<any>;
    refresh() : Promise<any>;
}

export { ISyncSupplier }