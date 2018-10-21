import { IListModel, ISyncModel } from '@coglite/apphost';

import { IListing } from './IListing';
import { IListingSearchRequest } from './IListingService';

interface IListingSearchModel extends IListModel<IListing>, IListingSearchRequest {
    sync: ISyncModel;
    setSearch(search : string) : void;
    setCategory(category : string[]) : void;
    setRequest(params : IListingSearchRequest) : void;
}

export { IListingSearchModel }