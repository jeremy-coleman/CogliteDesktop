import { IListing } from "./IListing";
import { IUserProfile } from "../user/IUserProfile";

interface IListingUserAccess {
    (listing : IListing, userProfile : IUserProfile) : boolean;
}

export { IListingUserAccess }