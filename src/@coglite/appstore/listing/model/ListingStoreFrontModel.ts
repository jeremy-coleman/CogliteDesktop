import { SyncSupplier } from '@coglite/apphost';

import { ListingServiceContext } from '../service/ListingServiceContext';
import { IListingService, IListingStoreFront } from '../types';

class ListingStoreFrontModel extends SyncSupplier<IListingStoreFront> {
    private _service : IListingService;

    get service() {
        return this._service || ListingServiceContext.value;
    }
    set service(value) {
        this._service = value;
    }
    
    protected _loadImpl() {
        return this.service.getStoreFront();
    }
}

export { ListingStoreFrontModel }