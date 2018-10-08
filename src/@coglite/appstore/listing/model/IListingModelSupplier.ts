import { ISyncSupplier } from "@coglite/apphost";
import { IListingModel } from "./IListingModel";

interface IListingModelSupplier extends ISyncSupplier<IListingModel> {
    listingId: string | number;
}

export { IListingModelSupplier }