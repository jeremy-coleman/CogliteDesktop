import { IBasicAuthCredentials } from '@coglite/apphost';
import axios from 'axios';

import { ICategory, ICategoryGetRequest, ICategoryListRequest, ICategoryService } from '../types';

const Defaults = {
    baseUrl: "/api",
    auth: undefined
};

class RestCategoryService implements ICategoryService {
    private _baseUrl : string;
    private _auth : IBasicAuthCredentials; 
    get baseUrl() {
        return this._baseUrl || Defaults.baseUrl;
    }
    set baseUrl(value : string) {
        this._baseUrl = value;
    }
    get auth() {
        return this._auth || Defaults.auth;
    }
    set auth(value : IBasicAuthCredentials) {
        this._auth = value;
    }
    getCategory(request : ICategoryGetRequest) : Promise<ICategory> {
        return axios.get(`${this.baseUrl}/category/${request.categoryId}/`, { auth: this.auth }).then(response => {
            return response.data as ICategory;
        });
    }
    getCategories(request : ICategoryListRequest) : Promise<ICategory[]> {
        return axios.get(`${this.baseUrl}/category/`, { params: request, auth: this.auth }).then(response => {
            return response.data as ICategory[];
        });
    }
    saveCategory(category : ICategory) : Promise<ICategory> {
        if(category.id !== undefined) {
            return axios.put(`${this.baseUrl}/category/${category.id}/`, { auth: this.auth }).then(response => {
                return response.data as ICategory;
            });
        }
        return axios.post(`${this.baseUrl}/category/`, { auth: this.auth }).then(response => {
            return response.data as ICategory;
        });
    }
    deleteCategory(category : ICategory) : Promise<any> {
        return axios.delete(`${this.baseUrl}/category/${category.id}/`, { auth: this.auth });
    }
}

export { RestCategoryService }