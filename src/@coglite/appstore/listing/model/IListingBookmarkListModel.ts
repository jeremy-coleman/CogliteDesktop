import { IListModel } from "@coglite/apphost";
import { IListingBookmark } from "../IListingBookmark";
import { IListing } from "../IListing";

interface IListingBookmarkListModel extends IListModel<IListingBookmark> {
    isBookmarked(listing : IListing) : boolean;
    addBookmark(listing : IListing) : void;
    removeBookmark(listing : IListing) : void;
}

export { IListingBookmarkListModel }