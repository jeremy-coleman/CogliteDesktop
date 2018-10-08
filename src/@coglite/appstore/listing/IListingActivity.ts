import { IUserProfile } from "../user/IUserProfile";
import { IListing } from "./IListing";
import { ListingActivityAction } from "./ListingActivityAction";

interface IListingChange {
    id?: number;
    field_name?: string;
    old_value?: string;
    new_value?: string;
}

interface IListingActivity {
    action?: ListingActivityAction;
    activity_date?: string;
    description?: string;
    author?: IUserProfile;
    listing?: IListing;
    change_details?: IListingChange[];
}

export { IListingChange, IListingActivity }