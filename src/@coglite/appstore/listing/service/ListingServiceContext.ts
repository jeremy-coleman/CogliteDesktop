import { Context } from '@coglite/apphost';

import { IListingService } from '../types';

const ListingServiceContext = new Context<IListingService>();

export { ListingServiceContext }