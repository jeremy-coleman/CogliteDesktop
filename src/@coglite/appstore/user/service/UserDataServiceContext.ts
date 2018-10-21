import { Context } from '@coglite/apphost';

import { IUserDataService } from '../types';

const UserDataServiceContext = new Context<IUserDataService>();

export { UserDataServiceContext }
