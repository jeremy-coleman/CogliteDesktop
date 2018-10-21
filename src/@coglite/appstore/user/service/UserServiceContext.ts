import { Context } from '@coglite/apphost';

import { IUserService } from '../types';

const UserServiceContext = new Context<IUserService>();

export { UserServiceContext }