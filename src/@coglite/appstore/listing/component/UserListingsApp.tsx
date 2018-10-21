import { IMutableSync, SyncModel } from '@coglite/apphost';
import * as React from 'react';

import { PortalAppBase } from '../../common/component/PortalAppBase';
import { PortalAppView } from '../../common/component/PortalAppView';
import { AppstorePathsContext } from '../../PathsContext';
import { UserAdminContext } from '../../user/UserAdminContext';
import { ListingViewConfig } from '../constants';
import { launch } from '../ListingLaunch';
import ListingListModel from '../model/ListingListModel';
import { IListing, IListingListModel } from '../types';
import { ListingLaunchDialog } from './ListingLaunchDialog';
import { UserListingsContainer } from './UserListings';


class UserListingsApp extends PortalAppBase {
    componentWillMount() {
        this.host.setTitle(`My ${ListingViewConfig.labelPlural}`);
    }
    private _onLoadStore = () => {
        this.host.load({ path: AppstorePathsContext.value.store() });
    }
    private _onLoadAllListings = () => {
        this.host.load({ path: AppstorePathsContext.value.listings() });
    }
    get listingList() : IListingListModel {
        return this.host.getState("userListingList", () => {
            return new ListingListModel();
        });
    }
    get launchSync() : IMutableSync<IListing> {
        return this.host.getState("appLaunchSync", () => {
            return new SyncModel();
        });
    }
    private _onLaunchApp = (listing : IListing) => {
        this.launchSync.syncStart({ id: listing });
        launch({ host: this.host, userProfile: this.userProfile, listingId: listing.id }).then(app => {
            this.launchSync.syncEnd();
        }).catch(err => {
            this.launchSync.syncError(err);  
        });
    }
    render() {
        const farItems : any[] = [
            {
                key: "store",
                name: `${ListingViewConfig.storeLabel}`,
                iconProps: {
                    iconName: "Shop"
                },
                onClick: this._onLoadStore
            }
        ];
        if(UserAdminContext.value(this.userProfile)) {
            farItems.push({
                key: "listings",
                name: `All ${ListingViewConfig.labelPlural}`,
                iconProps: {
                    iconName: "ViewList"
                },
                onClick: this._onLoadAllListings
            });
        }
        
        return (
            <PortalAppView host={this.host} userProfile={this.userProfile} commandBarProps={{ items: [], farItems: farItems }}>
                <ListingLaunchDialog sync={this.launchSync} />
                <UserListingsContainer 
                    userProfile={this.userProfile}
                    listingList={this.listingList}
                    onLaunchApp={this._onLaunchApp}
                />
            </PortalAppView>
        );
    }
}

export { UserListingsApp, UserListingsApp as default }