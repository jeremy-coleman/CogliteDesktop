import { Context, equalsIgnoreCase, IPredicateFunc } from '@coglite/apphost';

import { IUserProfile } from './types';

const defaultAdminCheck = (userProfile : IUserProfile) => {
    return userProfile && userProfile.user && userProfile.user.groups && userProfile.user.groups.some(g => {
        return equalsIgnoreCase(g.name, "admin");
    });
};

const UserAdminContext = new Context<IPredicateFunc<IUserProfile>>({
    value: defaultAdminCheck
});

export { UserAdminContext }