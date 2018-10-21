import { Context } from '@coglite/apphost';

import { ICategoryService } from '../types';

const CategoryServiceContext = new Context<ICategoryService>();

export { CategoryServiceContext }