import { SyncComponent } from '@coglite/apphost';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react';
import * as React from 'react';
import { stylesheet } from 'typestyle';

import { IUserProfile } from '../../user/types/IUserProfile';
import { ListingViewConfig } from '../constants';
import { canUserAccess } from '../ListingHelper';
import { IListing, IListingListModel } from '../types';
import { ListingIconTile } from './ListingIconTile';




const userListingStyles = stylesheet({
        root: {},
        list: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center"
        },
        listCell: {
            margin: 8
        }
})

interface IUserListingsProps {
    listingList: IListingListModel;
    userProfile: IUserProfile;
    onRenderCell?: (listing : IListing, index?: number, props?: IUserListingsProps) => React.ReactNode;
    onLaunchApp?: (listing : IListing) => void;
    //styles?: IUserListingsStyles;
    className?: string;
}

class UserListings extends React.Component<IUserListingsProps, any> {
    //private _classNames : IUserListingsClassNames;
    private _onRenderCell = (listing : IListing, index : number) => {
        const content = this.props.onRenderCell ?
                            this.props.onRenderCell(listing, index, this.props) :
                            <ListingIconTile listing={listing} onClick={this.props.onLaunchApp} />;
        return (
            <div key={listing.id} className={userListingStyles.listCell}>
                {content}
            </div>
        );
    }
    render() {
        //userListingStyles = getClassNames(getStyles(null, this.props.styles), this.props.className);
        let content;
        const listings = this.props.listingList.itemsView.filter(l => {
            return l.is_enabled && canUserAccess(l, this.props.userProfile);
        });
        if(listings.length > 0) {
            content = (
                <div className={userListingStyles.list}>
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
            <div className={userListingStyles.root}>
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