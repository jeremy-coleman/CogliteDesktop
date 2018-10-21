import { IAppHostModel, IAppProps, IMutableSync, SyncModel } from '@coglite/apphost';
import { observer } from 'mobx-react';
import * as React from 'react';

import { PortalAppView } from '../../common/component/PortalAppView';
import { AppstorePathsContext } from '../../PathsContext';
import { IUserProfile } from '../../user/types/IUserProfile';
import { ListingViewConfig } from '../constants';
import { launch } from '../ListingLaunch';
import { ListingListModel } from '../model/ListingListModel';
import { IListing } from '../types';
import { ListingLaunchDialog } from './ListingLaunchDialog';
import { ListingListPage } from './ListingListPage';

@observer
class ListingListApp extends React.Component<IAppProps, any> {
    get host() : IAppHostModel {
        return this.props.match.host;
    }
    get userProfile() : IUserProfile {
        return this.props.match.userProfile;
    }
    private _onSelectItem = (item : IListing) => {
        this.host.load({ path: AppstorePathsContext.value.listingDetails(item.id) });
    }
    private _onAdd = () => {
        this.host.load({ path: AppstorePathsContext.value.listingAdd() });
    }
    private _onRefresh = () =>{
        this.listings.refresh();
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
    get listings() {
        let listings = this.host.state.listings;
        if(!listings) {
            listings = new ListingListModel();
            this.host.setState({ listings: listings });
        }
        return listings;
    }
    componentWillMount() {
        this.host.title = `All ${ListingViewConfig.labelPlural}`;
        // we deliberately refresh here
        this.listings.load();
    }
    render() {
        const items = [];
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
        const farItems = [
            {
                key: "refresh",
                title: `Refresh ${ListingViewConfig.labelPlural}`,
                iconProps: {
                    iconName: "Refresh"
                },
                onClick: this._onRefresh,
                disabled: this.listings.sync.syncing
            }
        ];
        return (
            <PortalAppView host={this.host} userProfile={this.userProfile} commandBarProps={{ items: items, farItems: farItems }}>
                <ListingLaunchDialog sync={this.launchSync} />
                <ListingListPage compact wrapping
                                 listings={this.listings}
                                 onSelectItem={this._onSelectItem}
                                 onLaunch={this._onLaunchApp} />
            </PortalAppView>
        );
    }
}

export {
    ListingListApp,
    ListingListApp as default
}
