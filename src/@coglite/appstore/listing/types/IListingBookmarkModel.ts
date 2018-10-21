import { IListingBookmark } from "./IListingBookmark";
import { ISyncModel } from "@coglite/apphost";
import { IListingBookmarkListModel } from "./IListingBookmarkListModel";

interface IListingBookmarkModel extends IListingBookmark {
    bookmarks : IListingBookmarkListModel;
    launchSync: ISyncModel;
    data: IListingBookmark;
    setData(data : IListingBookmark) : void;
    launch() : Promise<any>;
    remove() : void;
}

export { IListingBookmarkModel }