
import Emitter from './Emitter';
import EmitterBase from './EmitterBase';


/**
 * A plug that could be subclassed
 * Connects to Emitter passing this.handlers (defined by subclass)
 */
export default class EmitterPlug extends EmitterBase {
    emitter: Emitter;
    handlers: any;


    constructor() {
        super();
        this.emitter = Emitter.getInstance();
    }

    handleSubscription(previousCount, nextCount) {
        if (previousCount === 0 && nextCount >= 1) {
            this.emitter.connect(this.handlers);
        } else if (previousCount && nextCount === 0) {
            this.emitter.disconnect(this.handlers);
        }
    }

}