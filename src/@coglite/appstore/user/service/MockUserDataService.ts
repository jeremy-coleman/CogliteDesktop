import { IUserDataService, IGetUserDataRequest } from "./IUserDataService";
import { IUserData } from "../IUserData";

class MockUserDataService implements IUserDataService {
    private _map : { [key : string] : IUserData } = {};
    listUserData() : Promise<IUserData[]> {
        const keys = Object.keys(this._map);
        const data = keys.map(key => {
            return this._map[key];
        });
        return Promise.resolve(data);
    }
    getUserData(request : IGetUserDataRequest) : Promise<IUserData> {
        return Promise.resolve(this._map[request.key]);
    }
    setUserData(data : IUserData) : Promise<any> {
        this._map[data.key] = data;
        return Promise.resolve(Object.assign({}, data));
    }
    deleteUserData(data : IUserData) : Promise<any> {
        delete this._map[data.key];
        return Promise.resolve();
    }
}

export { MockUserDataService }