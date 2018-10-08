import { IAppHost, IAppProps, IMutableSync, SyncModel } from '@coglite/apphost';
import { observer } from 'mobx-react';
import { IContextualMenuItem } from 'office-ui-fabric-react';
import * as React from 'react';

import { PortalAppView } from '../../common/component/PortalAppView';
import { AppstorePathsContext } from '../../PathsContext';
import { IUserProfile } from '../../user/IUserProfile';
import { UserAdminContext } from '../../user/UserAdminContext';
import { IListing } from '../IListing';
import { launch } from '../ListingLaunch';
import { ListingSearchModel } from '../model/ListingSearchModel';
import { ListingLaunchDialog } from './ListingLaunchDialog';
import { ListingSearch } from './ListingSearch';
import { ListingViewConfig } from './ListingViewConfig';


@observer
class ListingStoreFrontApp extends React.Component<IAppProps, any> {
    get host() : IAppHost {
        return this.props.match.host;
    }
    get userProfile() : IUserProfile {
        return this.props.match.userProfile;
    }
    get searchText() : string {
        return this.props.match.params.search;
    }
    get category() : string[] {
        return this.props.match.params.category;
    }
    private _onSelectItem = (listing : IListing) => {
        this.host.load({ path: AppstorePathsContext.value.listingDetails(listing.id) });
    }
    get launchSync() : IMutableSync<IListing> {
        return this.host.getState("appLaunchSync", () => {
            return new SyncModel();
        });
    }
    private _onLaunchApp = (listing : IListing) => {
        this.launchSync.syncStart({ id: listing });
        launch({ host: this.host, userProfile: this.userProfile, listingId: listing.id, noReplace: true }).then(app => {
            this.launchSync.syncEnd();
        }).catch(err => {
            this.launchSync.syncError(err);  
        });
    }
    private _onAdd = () => {
        this.host.load({ path: AppstorePathsContext.value.listingAdd() });
    }
    private _onOpenAllListings = () => {
        this.host.load({ path: AppstorePathsContext.value.listings() });
    }
    private _onRefresh = () =>{
        this.listingSearch.refresh();
    }
    get listingSearch() {
        return this.host.getState("listingSearch", () => {
            return new ListingSearchModel();
        });
    }
    componentWillMount() {
        this.host.title = `${ListingViewConfig.storeLabel}`;
        if(this.searchText || this.category) {
            this.listingSearch.setRequest({ search: this.searchText, category: this.category });
        }
    }
    render() {
        const items : IContextualMenuItem[] = [];
        const isAdmin = UserAdminContext.value(this.userProfile);
        if(isAdmin) {
            items.push(
                {
                    key: "add",
                    name: `Add ${ListingViewConfig.label}`,
                    title: `Add a new ${ListingViewConfig.label}`,
                    iconProps: {
                        iconName: "Add"
                    },
                    onClick: this._onAdd
                }
            );
        }
        const farItems : IContextualMenuItem[] = [];
        if(isAdmin) {
            farItems.push({
                key: "listings",
                name: `All ${ListingViewConfig.labelPlural}`,
                iconProps: {
                    iconName: "ViewList"
                },
                onClick: this._onOpenAllListings
            });
        }
        farItems.push(
            {
                key: "refresh",
                title: !this.listingSearch.sync.syncing ? `Refresh ${ListingViewConfig.labelPlural}` : "Refreshing...",
                iconProps: {
                    iconName: "Refresh"
                },
                onClick: this._onRefresh,
                disabled: this.listingSearch.sync.syncing
            }
        );
        return (
            <PortalAppView host={this.host} userProfile={this.userProfile} commandBarProps={{ items: items, farItems: farItems }}>
                <ListingLaunchDialog sync={this.launchSync} />
                <ListingSearch search={this.listingSearch}
                                onSelectItem={this._onSelectItem}
                                onLaunch={this._onLaunchApp} />
            </PortalAppView>
        );
    }
}

export {
    ListingStoreFrontApp,
    ListingStoreFrontApp as default
}