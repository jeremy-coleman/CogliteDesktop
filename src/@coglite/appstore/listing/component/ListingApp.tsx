import { IAppHost, IAppProps, IMutableSync, SyncModel } from '@coglite/apphost';
import { autorun, IReactionDisposer } from 'mobx';
import { observer } from 'mobx-react';
import { IContextualMenuItem } from 'office-ui-fabric-react';
import * as React from 'react';

import { ICategory } from '../../category/ICategory';
import { PortalAppView } from '../../common/component/PortalAppView';
import { AppstorePathsContext } from '../../PathsContext';
import { IUserProfile } from '../../user/IUserProfile';
import { UserAdminContext } from '../../user/UserAdminContext';
import { IListing } from '../IListing';
import { ListingApprovalStatus } from '../ListingApprovalStatus';
import { isOwner } from '../ListingHelper';
import { launch } from '../ListingLaunch';
import { IListingModel } from '../model/IListingModel';
import { IListingModelSupplier } from '../model/IListingModelSupplier';
import { ListingDeleteStore } from '../model/ListingDeleteStore';
import { ListingModelSupplier } from '../model/ListingModelSupplier';
import { ListingContainer, ListingDeleteDialog } from './Listing';
import { ListingLaunchDialog } from './ListingLaunchDialog';
import { ListingViewConfig } from './ListingViewConfig';

@observer
class ListingApp extends React.Component<IAppProps, any> {
    private _listingSupplier : IListingModelSupplier;
    private _titleSetDisposer : IReactionDisposer;
    get host() : IAppHost {
        return this.props.match.host;
    }
    get userProfile() : IUserProfile {
        return this.props.match.userProfile;
    }
    get isAdmin() {
        return UserAdminContext.value(this.userProfile);
    }
    get isOwner() {
        return isOwner(this.listing, this.userProfile);
    }
    get listingId() {
        return this.props.match.params.listingId;
    }
    get listing() : IListingModel {
        return this._listingSupplier.value;
    }
    get syncing() {
        return this._listingSupplier.sync.syncing;
    }
    private _onEdit = () => {
        this.host.load({ path: AppstorePathsContext.value.listingEdit(this.listingId) });
    }
    private _onDelete = () => {
        ListingDeleteStore.setValue(this.listing);
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
    private _onSubmit = () => {
        this.listing.submitForApproval();
    }
    private _onApprove = () => {
        this.listing.approve();
    }
    private _onReject = () => {
        this.listing.reject();
    }
    private _onRefresh = () => {
        this._listingSupplier.refresh();
    }
    private _onSelectCategory = (category : ICategory) => {
        console.log("-- On Select Category: " + JSON.stringify(category));
    }
    componentWillMount() {
        const s = new ListingModelSupplier(this.listingId);
        s.load();
        this._listingSupplier = s;
        this._titleSetDisposer = autorun(() =>
            this.host.setTitle(s.sync.syncing ? "Loading..." : s.value ? `${s.value.title} - ${ListingViewConfig.label} Details` : undefined)
        );
    }
    componentWillUnount() {
        if(this._titleSetDisposer) {
            this._titleSetDisposer();
            delete this._titleSetDisposer;
        }
    }
    render() {
        const items : IContextualMenuItem[] = [];
        
        if(!this.syncing && this.listing) {
            if(this.isAdmin || this.isOwner) {
                items.push({
                    key: "edit",
                    name: "Edit",
                    iconProps: {
                        iconName: "Edit"
                    },
                    onClick: this._onEdit
                });

                const approvalStatus = this.listing.approval_status;

                if(this.listing.canSubmit) {
                    items.push({
                        key: "submit",
                        name: "Submit for Approval",
                        iconProps: { iconName: "WorkFlow" },
                        onClick: this._onSubmit
                    });
                }

                if(this.isAdmin && approvalStatus === ListingApprovalStatus.PENDING) {
                    items.push({
                        key: "approve",
                        name: "Approve",
                        iconProps: { iconName: "Accept" },
                        onClick: this._onApprove
                    });
                    items.push({
                        key: "reject",
                        name: "Reject",
                        iconProps: { iconName: "Cancel" },
                        onClick: this._onReject
                    });
                }
            }

            if(this.isAdmin) {
                items.push({
                    key: "delete",
                    name: "Delete",
                    iconProps: {
                        iconName: "Delete"
                    },
                    onClick: this._onDelete,
                    disabled: this.syncing
                });
            }
        }

        const farItems : IContextualMenuItem[] = [
            {
                key: "refresh",
                title: `Refresh ${ListingViewConfig.label}`,
                iconProps: {
                    iconName: "Refresh"
                },
                onClick: this._onRefresh,
                disabled: this.syncing
            }
        ];
        return (
            <PortalAppView host={this.host} userProfile={this.userProfile} commandBarProps={{ items: items, farItems: farItems }}>
                <ListingLaunchDialog sync={this.launchSync} />
                <ListingDeleteDialog listingSupplier={ListingDeleteStore} />
                <ListingContainer listingSupplier={this._listingSupplier}
                                  onEdit={this._onEdit}
                                  onDelete={this._onDelete}
                                  onLaunch={this._onLaunchApp}
                                  onSelectCategory={this._onSelectCategory} />
            </PortalAppView>
        );
    }
}

export {
    ListingApp,
    ListingApp as default
}

