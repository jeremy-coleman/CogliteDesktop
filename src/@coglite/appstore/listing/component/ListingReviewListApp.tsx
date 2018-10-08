import { IAppHostBaseProps, ISyncSupplier } from '@coglite/apphost';
import { IContextualMenuItem } from 'office-ui-fabric-react';
import * as React from 'react';

import { PortalAppView } from '../../common/component/PortalAppView';
import { IListingModel } from '../model/IListingModel';
import { findById } from '../model/ListingFinder';
import { getReviews } from '../model/ListingReviewHelper';
import { ListingReviewListContainer } from './ListingReviewList';
import { ListingSupplierContainer } from './ListingSupplier';

interface IListingReviewListAppProps extends IAppHostBaseProps {
    listingId: number;
}

class ListingReviewListApp extends React.Component<IListingReviewListAppProps, any> {
    private _onRenderListing = (listing : IListingModel) => {
        return <ListingReviewListContainer reviewList={getReviews(listing)} />;
    }
    get listingSupplier() : ISyncSupplier<IListingModel> {
        return this.props.host.getState("listingSupplier", () => {
            return findById(this.props.listingId);
        });
    }
    render() {
        const items : IContextualMenuItem[] = [
            {
                key: "title",
                name: "Listing Reviews"
            }  
        ];
        return (
            <PortalAppView host={this.props.host} commandBarProps={{ items: items }}>
                <ListingSupplierContainer listingSupplier={this.listingSupplier} onRenderListing={this._onRenderListing} />
            </PortalAppView>
        );
    }
}

export { IListingReviewListAppProps, ListingReviewListApp }
