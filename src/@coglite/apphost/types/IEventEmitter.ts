interface IEvent {
    type: string;
    [key : string] : any;
}

interface IEventListener {
    handleEvent(event : IEvent) : void;
}

interface IEventListenerFunc {
    (event : IEvent) : void;
}

interface IEventTarget {
    addEventListener(type : string, handler : IEventListener | IEventListenerFunc) : void;
    removeEventListener(type : string, handler : IEventListener | IEventListenerFunc) : void;
}

interface IEventEmitter extends IEventTarget {
    emit(event : IEvent) : void;
}

export { IEvent, IEventListener, IEventListenerFunc, IEventTarget, IEventEmitter }