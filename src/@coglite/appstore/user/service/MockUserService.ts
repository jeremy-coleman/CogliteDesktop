import { IUserService, IGetUsersRequest } from "./IUserService";
import { IUserProfile } from "../IUserProfile";
import { IUser } from "../IUser";

const MockUserProfile : IUserProfile = {
    id: 1,
    display_name: "Mock User",
    bio: "Mock User Bio",
    user: {
        username: "mock",
        email: "mock@coglite.test",
        groups: [
            {
                name: "user"
            },
            {
                name: "developer"
            },
            {
                name: "admin"
            }
        ]
    }
};

class MockUserService implements IUserService {
    private _userProfile : IUserProfile;
    get userProfile() {
        return this._userProfile || MockUserProfile;
    }
    set userProfile(value) {
        this._userProfile = value;
    }
    getUsers(request?: IGetUsersRequest) : Promise<IUser[]> {
        return Promise.resolve([this.userProfile.user]);
    }
    getUserProfile() : Promise<IUserProfile> {
        return Promise.resolve(Object.assign({}, this.userProfile));
    }
}

export { MockUserService, MockUserProfile }