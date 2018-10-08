import { ILoggingService } from "./ILoggingService";

interface ILogEntry {
    message: any;
    optionalParams?: any[];
}

class CollectingLoggingService implements ILoggingService {
    private _infos : ILogEntry[];
    private _warns : ILogEntry[];
    private _errors : ILogEntry[];
    get infos() : ILogEntry[] {
        return this._infos ? [].concat(this._infos) : [];
    }
    get warns() : ILogEntry[] {
        return this._warns ? [].concat(this._warns) : [];
    }
    get errors() : ILogEntry[] {
        return this._errors ? [].concat(this._errors) : [];
    }
    info(message : any, ...optionalParams : any[]) : void {
        if(!this._infos) {
            this._infos = [];
        }
        this._infos.push({ message: message, optionalParams: optionalParams });
    }
    warn(message : any, ...optionalParams : any[]) : void {
        if(!this._warns) {
            this._warns = [];
        }
        this._warns.push({ message: message, optionalParams: optionalParams });
    }
    error(message : any, ...optionalParams : any[]) : void {
        if(!this._errors) {
            this._errors = [];
        }
        this._errors.push({ message: message, optionalParams: optionalParams });
    }
    clear() {
        delete this._infos;
        delete this._warns;
        delete this._errors;
    }
}

export { ILogEntry, CollectingLoggingService as default, CollectingLoggingService }