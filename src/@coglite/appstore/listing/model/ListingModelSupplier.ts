import { SyncSupplier } from '@coglite/apphost';

import { ListingServiceContext } from '../service/ListingServiceContext';
import { IListingModel } from './IListingModel';
import { IListingModelSupplier } from './IListingModelSupplier';
import { ListingModel } from './ListingModel';

class ListingModelSupplier extends SyncSupplier<IListingModel> implements IListingModelSupplier {
    private _listingId : string | number;
    constructor(listingId : string | number) {
        super();
        this._listingId = listingId;
    }
    get listingId() : string | number {
        return this._listingId;
    }
    protected _loadImpl() {
        return ListingServiceContext.value.getListing({ listingId: this._listingId }).then(data => {
            return new ListingModel(data);
        });
    }
}

export { ListingModelSupplier }