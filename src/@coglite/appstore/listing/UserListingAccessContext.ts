import { Context, isNotBlank, trim } from '@coglite/apphost';

import { IUserProfile } from '../user/types/IUserProfile';
import { isMemberOfGroup } from '../user/UserHelper';
import { IListing } from './types';
import { IListingUserAccess } from './types';

const defaultUserListingAccess : IListingUserAccess = (listing : IListing, userProfile : IUserProfile) => {
    if(listing && isNotBlank(listing.security_marking)) {
        const listingGroups = listing.security_marking.split(",").map(s => trim(s));
        return listingGroups.some(lg => {
            return isMemberOfGroup(userProfile, lg);
        });
    }
    return true;
};

const UserListingAccessContext = new Context<IListingUserAccess>({
    value: defaultUserListingAccess
});

export { UserListingAccessContext }