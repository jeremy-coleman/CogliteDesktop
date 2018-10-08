import { Context } from "../models"
import { IAppHost } from "./IAppHost";

const HostContext = new Context<IAppHost>();

export { HostContext }