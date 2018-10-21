import { IUserData } from "./IUserData";

interface IGetUserDataRequest {
    key: string;
}

interface IUserDataService {
    listUserData() : Promise<IUserData[]>;
    getUserData(request : IGetUserDataRequest) : Promise<IUserData>;
    setUserData(data : IUserData) : Promise<any>;
    deleteUserData(data : IUserData) : Promise<any>;
}

export { IGetUserDataRequest, IUserDataService }