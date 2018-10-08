import { Context } from '@coglite/apphost';

import { IListingService } from './IListingService';

const ListingServiceContext = new Context<IListingService>();

export { ListingServiceContext }