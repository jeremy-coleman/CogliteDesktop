import {  ISupplierFunc } from '../../types';
import { alwaysTrue } from '../../models';
import { ILoggingService } from './ILoggingService';

interface IControlledLoggingServiceOptions {
    target : ILoggingService;
    activeSupplier?: ISupplierFunc<boolean>;
}

class ControlledLoggingService implements ILoggingService {
    private _target : ILoggingService;
    private _activeSupplier : ISupplierFunc<boolean>;
    constructor(opts : IControlledLoggingServiceOptions) {
        this._target = opts.target;
        this._activeSupplier = opts.activeSupplier || alwaysTrue;
    }
    info(message : any, ...optionalParams : any[]) : void {
        if(this._activeSupplier()) {
            this._target.info(message, optionalParams);
        }
    }
    warn(message : any, ...optionalParams : any[]) : void {
        if(this._activeSupplier()) {
            this._target.warn(message, optionalParams);
        }
    }
    error(message : any, ...optionalParams : any[]) : void {
        if(this._activeSupplier()) {
            this._target.error(message, optionalParams);
        }
    }
}

export { IControlledLoggingServiceOptions, ControlledLoggingService }