import { IUser } from "../IUser";
import { IUserProfile } from "../IUserProfile";

interface IGetUsersRequest {
    offset?: number;
    limit?: number;
}

interface IUserService {
    getUsers(request?: IGetUsersRequest) : Promise<IUser[]>;
    getUserProfile() : Promise<IUserProfile>;
}

export { IUserService, IGetUsersRequest }