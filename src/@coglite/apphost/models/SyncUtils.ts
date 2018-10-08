import { ISyncModel } from "../types";
import { autorun } from "mobx";

const toPromise = (sync : ISyncModel) : Promise<any> => {
    return new Promise((resolve, reject) => {
        const disposer = autorun(() => {
            if(!sync.syncing && sync.hasSynced) {
                disposer();
                if(sync.error) {
                    reject(sync.error);
                } else {
                    resolve();
                }
            }
        });
    });
};

export { toPromise }