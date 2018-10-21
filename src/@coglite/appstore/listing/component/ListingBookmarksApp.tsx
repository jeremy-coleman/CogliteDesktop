import { AppLink, IAppHostModel, IAppProps, IMutableSync, SyncModel } from '@coglite/apphost';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react';
import * as React from 'react';

import { PortalAppView } from '../../common/component/PortalAppView';
import { AppstorePathsContext } from '../../PathsContext';
import { IUserProfile } from '../../user/types/IUserProfile';
import { UserAdminContext } from '../../user/UserAdminContext';
import { ListingViewConfig } from '../constants';
import { launch } from '../ListingLaunch';
import { ListingBookmarkListStore } from '../model/ListingBookmarkListStore';
import { IListing, IListingBookmark } from '../types';
import { ListingBookmarksContainer } from './ListingBookmarks';
import { ListingLaunchDialog } from './ListingLaunchDialog';

class ListingBookmarksApp extends React.Component<IAppProps, any> {
    get host() : IAppHostModel {
        return this.props.match.host;
    }
    get userProfile() : IUserProfile {
        return this.props.match.userProfile;
    }
    get launchSync() : IMutableSync<IListing> {
        return this.host.getState("listingLaunchSync", () => {
            return new SyncModel();
        });
    }
    private _onLaunchBookmark = (bookmark : IListingBookmark) => {
        this.launchSync.syncStart({ id: bookmark.listing });
        launch({ host: this.host, userProfile: this.userProfile, listingId: bookmark.listing.id }).then(app => {
            this.launchSync.syncEnd();
        }).catch(err => {
            this.launchSync.syncError(err);  
        });
    }
    componentWillMount() {
        this.host.setTitle("Bookmarks");
    }
    private _onLoadStore = () => {
        this.host.load({ path: AppstorePathsContext.value.store() });
    }
    private _onLoadAllListings = () => {
        this.host.load({ path: AppstorePathsContext.value.listings() });
    }
    private _onRenderNoBookmarks = () => {
        return (
            <div style={{ padding: 8 }}>
                <MessageBar  messageBarType={MessageBarType.info}>
                    You haven't bookmarked anything. <AppLink host={this.host} request={{ path: AppstorePathsContext.value.store() }} onClick={this._onLoadStore}>Take a look in the {ListingViewConfig.storeLabel}</AppLink>.
                </MessageBar>
            </div>
        );
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
                <ListingBookmarksContainer bookmarkList={ListingBookmarkListStore} onLaunch={this._onLaunchBookmark} onRenderNoBookmarks={this._onRenderNoBookmarks} />
            </PortalAppView>
        );
    }
}

export {
    ListingBookmarksApp,
    ListingBookmarksApp as default
}