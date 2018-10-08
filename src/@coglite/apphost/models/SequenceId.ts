interface ISequenceId {
    next() : string;
    reset() : void;
}

class SequenceId implements ISequenceId {
    private _prefix : string;
    private _id : number;
    constructor(prefix : string = "") {
        this._prefix = prefix;
    }
    next() : string {
        if(this._id === undefined) {
            this._id = 0;
        } else {
            this._id ++;
        }
        return this._prefix + this._id;
    }
    reset() {
        this._id === undefined;
    }
}

interface ISequenceIdInstances {
    [k : string] : ISequenceId
}

const instances : ISequenceIdInstances = {}; 
const defaultInstance = new SequenceId();

const getSequenceId = (name? : string) : ISequenceId => {
    if(name !== undefined) {
        let instance = instances[name];
        if(!instance) {
            instance = new SequenceId(name);
            instances[name] = instance;
        }
        return instance;
    }
    return defaultInstance;
};

const next = function(name? : string) : string {
    return getSequenceId(name).next();
};

export { ISequenceId, SequenceId, getSequenceId, next };