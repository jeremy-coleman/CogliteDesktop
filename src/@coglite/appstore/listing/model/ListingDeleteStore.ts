import { IListingModel } from "./IListingModel";
import { SyncSupplier } from "@coglite/apphost";

const ListingDeleteStore = new SyncSupplier<IListingModel>();

export { ListingDeleteStore }