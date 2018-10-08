import { AbstractAppHost } from "./AbstractAppHost";
import { EventEmitter  } from "../models";
import { IRequest } from "@coglite/router";
import {IEventEmitter} from '../types'


class AppHost extends AbstractAppHost {
    protected _events : IEventEmitter = new EventEmitter();
    private _defaultRequest : IRequest;

    get defaultRequest() : IRequest {
        return Object.assign({}, this._defaultRequest);
    }
    set defaultRequest(value : IRequest) {
        this.setDefaultRequest(value);
    }
    setDefaultRequest(defaultRequest : IRequest) {
        this._defaultRequest = defaultRequest;
    }

    close() {
        // does nothing
    }

    addEventListener(type, handler) : void {
        this._events.addEventListener(type, handler);
    }

    removeEventListener(type, handler) : void {
        this._events.addEventListener(type, handler);
    }

    emit(event) : void {
        this._events.emit(event);
    }
}

export { AppHost }