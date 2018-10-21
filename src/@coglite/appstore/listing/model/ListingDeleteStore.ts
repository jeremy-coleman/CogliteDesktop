import { SyncSupplier } from '@coglite/apphost';

import { IListingModel } from '../types';

const ListingDeleteStore = new SyncSupplier<IListingModel>();

export { ListingDeleteStore }