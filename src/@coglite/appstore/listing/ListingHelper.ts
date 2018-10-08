import { IListing } from "./IListing";
import { IUserProfile } from "../user/IUserProfile";
import { UserListingAccessContext } from "./UserListingAccessContext";
import { UserAdminContext } from "../user/UserAdminContext";

/**
 * Note: this is all temporary - how listings are handled on the view side would actually depend on the
 * listing type.
 */

const isExternalUrl = (launchUrl : string) : boolean => {
    return launchUrl && launchUrl.indexOf("://") >= 0;
};

const isExternalListing = (listing : IListing) : boolean => {
    return listing ? isExternalUrl(listing.launch_url) : false;
};

const isApplicationUrl = (launchUrl : string) : boolean => {
    return launchUrl && launchUrl.endsWith(".js");
};

const isApplicationListing = (listing : IListing) : boolean => {
    return listing ? isApplicationUrl(listing.launch_url) : false;
};

const isOwner = (listing : IListing, userProfile : IUserProfile) : boolean => {
    return listing && listing.owners && listing.owners.some(o => o.id === userProfile.id);
};

const canUserAccess = (listing : IListing, userProfile : IUserProfile) : boolean => {
    return UserAdminContext.value(userProfile) || UserListingAccessContext.value(listing, userProfile);
};

export {
    isExternalUrl,
    isExternalListing,
    isApplicationUrl,
    isApplicationListing,
    canUserAccess,
    isOwner
}