import { IGroup } from "./IGroup";

interface IUser {
    username?: string;
    email?: string;
    groups?: IGroup[];
}

export { IUser }