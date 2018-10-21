import { SyncSupplier } from '@coglite/apphost';

import { UserServiceContext } from '../service/UserServiceContext';
import { IUserProfile } from '../types';

const UserProfileStore = new SyncSupplier<IUserProfile>();
UserProfileStore.loader = () => {
    return UserServiceContext.value.getUserProfile();
};

export { UserProfileStore }