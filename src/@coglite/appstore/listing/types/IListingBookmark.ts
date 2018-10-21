import { IListing } from "./IListing";

interface IListingBookmark {
    id?: number;
    folder?: string;
    position?: number;
    listing?: IListing;
}

export { IListingBookmark }