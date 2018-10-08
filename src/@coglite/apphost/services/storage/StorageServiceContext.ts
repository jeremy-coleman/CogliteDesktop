import { Context } from "../../models";
import { IStorageService } from "./IStorageService";

const StorageServiceContext = new Context<IStorageService>();

export {StorageServiceContext}

//export default StorageServiceContext

//export { StorageServiceContext, StorageServiceContext as default }