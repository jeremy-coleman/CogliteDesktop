import { ISyncSupplier, SyncComponent } from '@coglite/apphost';
import * as React from 'react';

import { IListingModel } from '../types';

class IListingSupplierProps {
    listingSupplier?: ISyncSupplier<IListingModel>;
    onRenderListing: (listing : IListingModel) => React.ReactNode;
}

class ListingSupplierContainer extends React.Component<IListingSupplierProps, any> {
    private _onRenderDone = () => {
        return this.props.onRenderListing(this.props.listingSupplier.value);
    }
    render() {
        return <SyncComponent sync={this.props.listingSupplier.sync} onRenderDone={this._onRenderDone} />;
    }
}

export { IListingSupplierProps, ListingSupplierContainer }