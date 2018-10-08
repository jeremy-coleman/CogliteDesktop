import { IListing } from "../IListing";
import { IListModel } from "@coglite/apphost";
import { IListingListCounts } from "../service/IListingService";

interface IListingListModel extends IListModel<IListing> {
    searchText : string;
    setSearchText(searchText : string) : void;
    counts: IListingListCounts;
}

export { IListingListModel };