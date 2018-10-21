import { IRequest } from "@coglite/router";
import { IAppHostModel } from "./IAppHostModel";

interface IAppLauncher {
    (request : IRequest) : IAppHostModel | Promise<IAppHostModel>;
}

export { IAppLauncher }