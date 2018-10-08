import { ISyncSupplier } from "../types";

interface IFinder<V> {
    (key : string | number) : ISyncSupplier<V>;
}

interface ICachingFinderOpts<V> {
    finder: IFinder<V>;
    cacheForMillis?: number;
    noLoad?: boolean;
}

interface ICacheEntry<V> {
    supplier: ISyncSupplier<V>,
    timeout?: any;
}

const cachingFinder = <V>(opts : ICachingFinderOpts<V>) : IFinder<V> => {
    const cache : { [key : string] : ICacheEntry<V> } = {};
    const eopts = Object.assign({}, opts);
    return (key : string | number) : ISyncSupplier<V> => {
        if(!eopts.cacheForMillis || eopts.cacheForMillis <= 0) {
            return opts.finder(key);
        }
        const skey = String(key);
        let entry = cache[skey];
        if(!entry) {
            entry = { supplier: eopts.finder(key) };
            cache[skey] = entry;
            
            // add our deletion timeout
            entry.timeout = setTimeout(() => {
                delete cache[skey];
            }, eopts.cacheForMillis);
        }
        if(!eopts.noLoad) {
            entry.supplier.load();
        }
        return entry.supplier;
    };
};

export { ICachingFinderOpts, IFinder }