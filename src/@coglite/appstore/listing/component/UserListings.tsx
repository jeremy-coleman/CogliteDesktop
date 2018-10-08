import { SyncComponent } from '@coglite/apphost';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react';
import * as React from 'react';

import { IUserProfile } from '../../user/IUserProfile';
import { IListing } from '../IListing';
import { canUserAccess } from '../ListingHelper';
import { IListingListModel } from '../model/IListingListModel';
import { ListingIconTile } from './ListingIconTile';
import { ListingViewConfig } from './ListingViewConfig';
import { getClassNames, IUserListingsClassNames } from './UserListings.classNames';
import { getStyles, IUserListingsStyles } from './UserListings.styles';

interface IUserListingsProps {
    listingList: IListingListModel;
    userProfile: IUserProfile;
    onRenderCell?: (listing : IListing, index?: number, props?: IUserListingsProps) => React.ReactNode;
    onLaunchApp?: (listing : IListing) => void;
    styles?: IUserListingsStyles;
    className?: string;
}

class UserListings extends React.Component<IUserListingsProps, any> {
    private _classNames : IUserListingsClassNames;
    private _onRenderCell = (listing : IListing, index : number) => {
        const content = this.props.onRenderCell ?
                            this.props.onRenderCell(listing, index, this.props) :
                            <ListingIconTile listing={listing} onClick={this.props.onLaunchApp} />;
        return (
            <div key={listing.id} className={this._classNames.listCell}>
                {content}
            </div>
        );
    }
    render() {
        this._classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        let content;
        const listings = this.props.listingList.itemsView.filter(l => {
            return l.is_enabled && canUserAccess(l, this.props.userProfile);
        });
        if(listings.length > 0) {
            content = (
                <div className={this._classNames.list}>
                    {listings.map(this._onRenderCell)}
                </div>
            );
        } else {
            content = (
                <MessageBar messageBarType={MessageBarType.warning}>
                   You don't have access to any {ListingViewConfig.labelPlural}
                </MessageBar>
            );
        }
        return (
            <div className={this._classNames.root}>
                {content}
            </div>
        );
    }
}

class UserListingsContainer extends React.Component<IUserListingsProps, any> {
    componentWillMount() {
        this.props.listingList.load();
    }
    private _onRenderDone = () => {
        return <UserListings {...this.props} />;
    }
    render() {
        return (
            <SyncComponent sync={this.props.listingList.sync} onRenderDone={this._onRenderDone} />
        );
    }
}

export { IUserListingsProps, UserListingsContainer, UserListings }