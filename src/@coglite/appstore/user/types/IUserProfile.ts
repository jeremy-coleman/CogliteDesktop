import { IUser } from "./IUser";

interface IUserProfile {
    id?: number;
    display_name?: string;
    bio?: string;
    user?: IUser;
}

export { IUserProfile }