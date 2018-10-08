import { Context } from "@coglite/apphost";
import { IUserService } from "./IUserService";

const UserServiceContext = new Context<IUserService>();

export { UserServiceContext }