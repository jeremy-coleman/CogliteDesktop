import { IStorageService } from '@coglite/apphost';

import { IUserData, IUserDataService } from '../types';
import { UserDataServiceContext } from './UserDataServiceContext';

const contentType = "application/json";

class UserDataStorageService implements IStorageService {
    private _userDataService : IUserDataService;
    get userDataService() {
        return this._userDataService || UserDataServiceContext.value;
    }
    set userDataService(value) {
        this._userDataService = value;
    }
    private checkState() {
        if(!this.userDataService) {
            throw {
                code: "INVALID_STATE",
                key: "userDataService",
                message: "No User Data Service Configured"
            };
        }
    }
    async getItem(key : string) : Promise<any> {
        this.checkState();
        const userData = await this.userDataService.getUserData({ key: key });
        if(!userData) {
            return undefined;
        }
        return JSON.parse(userData.entity);
    }
    async setItem(key : string, value : any) {
        if(!value) {
            return this.removeItem(key);
        }
        this.checkState();
        const userData : IUserData = { key: key, entity: JSON.stringify(value), content_type: contentType };
        return this.userDataService.setUserData(userData);
    }
    async removeItem(key : string) {
        this.checkState();
        return this.userDataService.deleteUserData({ key: key });
    }
}

export { UserDataStorageService }