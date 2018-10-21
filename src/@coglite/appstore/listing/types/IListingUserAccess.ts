import { IListing } from "./IListing";
import { IUserProfile } from "../../user/types/IUserProfile";

interface IListingUserAccess {
    (listing : IListing, userProfile : IUserProfile) : boolean;
}

export { IListingUserAccess }