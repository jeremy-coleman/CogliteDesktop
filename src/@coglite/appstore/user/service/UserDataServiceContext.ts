import { Context } from "@coglite/apphost";
import { IUserDataService } from "./IUserDataService";

const UserDataServiceContext = new Context<IUserDataService>();

export { UserDataServiceContext }
