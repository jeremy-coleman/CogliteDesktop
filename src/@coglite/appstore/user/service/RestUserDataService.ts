import { IBasicAuthCredentials } from '@coglite/apphost';
import axios from 'axios';

import { IGetUserDataRequest, IUserData, IUserDataService } from '../types';

const Defaults = {
    baseUrl: "/coglite/api",
    auth: undefined
};

class RestUserDataService implements IUserDataService {
    private _baseUrl : string;
    private _auth : IBasicAuthCredentials;
    get baseUrl() {
        return this._baseUrl || Defaults.baseUrl;
    }
    set baseUrl(value) {
        this._baseUrl = value;
    }
    get auth() {
        return this._auth || Defaults.auth;
    }
    set auth(value) {
        this._auth = value;
    }
    listUserData() : Promise<IUserData[]> {
        return axios.get(`${this.baseUrl}/self/data/`).then(ar => {
            const r = ar.data;
            return r && r._embedded && r._embedded.item ? r._embedded.item as IUserData[] : [];
        });
    }
    getUserData(request : IGetUserDataRequest) : Promise<IUserData> {
        return axios.get(`${this.baseUrl}/self/data/${encodeURIComponent(request.key)}`, { auth: this.auth }).then(ar => {
            return ar.data as IUserData;
        }).catch(err => {
            if(err.response && err.response.status !== 404) {
                return Promise.reject(err);
            }  
        });
    }
    setUserData(data : IUserData) : Promise<IUserData> {
        return axios.put(`${this.baseUrl}/self/data/${encodeURIComponent(data.key)}/`, data, { auth: this.auth }).then(ar => {
            return ar.data as IUserData;
        });
    }
    deleteUserData(data : IUserData) : Promise<any> {
        return axios.delete(`${this.baseUrl}/self/data/${encodeURIComponent(data.key)}/`, { auth: this.auth} );
    }
}

export { RestUserDataService }

