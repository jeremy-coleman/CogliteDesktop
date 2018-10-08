import { ISyncModel } from "./ISyncModel";

interface ISyncOptions<I = any> {
    id?: I;
    type?: any;
}

interface IMutableSync<I = any> extends ISyncModel<I> {
    syncStart(opts?: ISyncOptions<I>) : void;
    syncEnd() : void;
    syncError(error : any) : void;
    clear() : void;
}

export { ISyncOptions, IMutableSync }