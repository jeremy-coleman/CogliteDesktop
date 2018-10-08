import { IStorageService } from "./IStorageService";


class BrowserStorageService implements IStorageService {
    private _storage : Storage;
    private _storageManager: StorageManager

    constructor(storage : Storage) {
        this._storage = storage;
        this._storageManager = new StorageManager()
    }

    getItem(key : string) : Promise<any> {
        try {
            const itemSpec = this._storage.getItem(key);
            let r;
            if(itemSpec) {
                r = JSON.parse(itemSpec);
            }
            return Promise.resolve(r);
        } catch(error) {
            return Promise.reject(error);
        }
    }
    setItem(key : string, item : any) : Promise<any> {
        try {
            this._storage.setItem(key, JSON.stringify(item));
            return Promise.resolve();
        } catch(error) {
            return Promise.reject(error);
        }
    }
    removeItem(key : string) : Promise<any> {
        try {
            this._storage.removeItem(key);
            return Promise.resolve();
        } catch(error) {
            return Promise.reject(error);
        }
    }

    public async clear(): Promise<void> {
        this._storage.clear();
        return Promise.resolve();
    }

    public async size(){
        this._storageManager.estimate()
    }
}

class LocalStorageService extends BrowserStorageService {
    constructor() {
        super(window.localStorage);
    }
}

class SessionStorageService extends BrowserStorageService {
    constructor() {
        super(window.sessionStorage);
    }
}

export { BrowserStorageService, LocalStorageService, SessionStorageService }

