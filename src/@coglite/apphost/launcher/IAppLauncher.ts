import { IRequest } from "@coglite/router";
import { IAppHost } from "../host";

interface IAppLauncher {
    (request : IRequest) : IAppHost | Promise<IAppHost>;
}

export { IAppLauncher }