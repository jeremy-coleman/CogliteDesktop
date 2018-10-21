import { isNotBlank, ISyncSupplier, SyncComponent, SyncOverlay, theme } from '@coglite/apphost';
import Toggle from '@material-ui/core/Switch';
import { observer } from 'mobx-react';
import {
    DefaultButton,
    Dialog,
    DialogFooter,
    FontSizes,
    Link,
    Pivot,
    PivotItem,
    PrimaryButton,
    Rating,
} from 'office-ui-fabric-react';
import * as React from 'react';
import { stylesheet } from 'typestyle';

import { UserAdminContainer, UserAuthContainer } from '../../user/component/UserAuthContainer';
import { IUserProfile } from '../../user/types';
import { UserAdminContext } from '../../user/UserAdminContext';
import { ListingViewConfig } from '../constants';
import { canUserAccess } from '../ListingHelper';
import { getActivity } from '../model/ListingActivityHelper';
import { ListingBookmarkListStore } from '../model/ListingBookmarkListStore';
import { getReviews } from '../model/ListingReviewHelper';
import { ICategory, IListing, IListingBookmarkListModel, IListingModel } from '../types';
import { ListingActivityListContainer } from './ListingActivityList';
import { ListingBannerIcon } from './ListingBannerIcon';
import { ListingBookmarkButton } from './ListingBookmarkButton';
import { ListingLaunchAction } from './ListingLaunchAction';
import { ListingLinks } from './ListingLinks';
import { ListingReviewListContainer } from './ListingReviewList';
import { ListingSaveSyncError } from './ListingSaveSyncError';
import { ListingSupplierContainer } from './ListingSupplier';



const listingStyles = stylesheet({
            root: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "hidden"
        },
        metadata: {
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: 240,
            paddingTop: 8,
            paddingLeft: 12,
            paddingBottom: 8,
            overflow: "auto"
        },
        metadataSection: {
            marginTop: 8
        },
        metadataSectionTitle: {
            margin: 0,
            paddingBottom: 4,
            fontSize: FontSizes.small,
            fontWeight: 600
        },
        metadataSectionContent: {
            fontWeight: 100,
            fontSize: FontSizes.small
        },
        detailContent: {
            position: "absolute",
            left: 260,
            top: 0,
            bottom: 0,
            right: 0,
            paddingTop: 8,
            paddingRight: 12,
            overflow: "auto"
        },
        detailTabs: {

        },
        title: {
            paddingLeft: 8,
            fontSize: FontSizes.xLarge,
            fontWeight: 600
        },
        overview: {
            paddingTop: 8
        },
        shortDescription: {
            padding: 8,
            fontSize: FontSizes.mediumPlus,
            fontWeight: 600
        },
        actions: {
            display: "flex",
            alignItems: "center",
            marginTop: 8,
            $nest: {
                ".ms-Button+.ms-Button": {
                    marginLeft: 8
                }
            }
        },
        description: {
            padding: 8,
            whiteSpace: "pre-wrap",
            fontSize: FontSizes.medium,
            fontWeight: 300
        },
        banner: {
            width: 220,
            height: 137,
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.palette.neutralLight
        },
        rating: {
            marginTop: 8,
            display: "flex"
        },
        ratingStars: {
            color: theme.palette.yellow
        },
        reviewCount: {
            paddingLeft: 8
        }
})



interface IListingProps {
    listing: IListingModel;
    adminGroup?: string;
    bookmarkList?: IListingBookmarkListModel;
    onEdit?: (listing : IListingModel) => void;
    onLaunch?: (listing : IListing) => void;
    onDelete?: (listing : IListingModel) => void;
    onSelectCategory?: (category : ICategory) => void;
    //styles?: IListingStyles;
    className?: string;
}

class ListingReviews extends React.Component<IListingProps, any> {
    render() {
        return <ListingReviewListContainer reviewList={getReviews(this.props.listing)} />
    }
}

class ListingActivity extends React.Component<IListingProps, any> {
    render() {
        return <ListingActivityListContainer activityList={getActivity(this.props.listing)} />
    }
}

interface IListingCategoryProps extends IListingProps {
    category: ICategory;
    onClickCategory?: (category : ICategory) => void;
}

class ListingCategory extends React.Component<IListingCategoryProps, any> {
    private _onClick = (e) => {
        e.preventDefault();
        if(this.props.onClickCategory) {
            this.props.onClickCategory(this.props.category);
        }
    }
    render() {
        return (
            <div>
                <Link onClick={this._onClick}>{this.props.category.title}</Link>
            </div>
        );
    }
}

class ListingCategoryList extends React.Component<IListingProps, any> {
    render() {
        const categories = this.props.listing.categories;
        if(categories && categories.length > 0) {
            const categoryViews = categories.map(c => {
                return <ListingCategory key={c.title} {...this.props} category={c} onClickCategory={this.props.onSelectCategory} />
            });
            return categoryViews;
        }
        return null;
    }
}

@observer
class ListingCategories extends React.Component<IListingProps, any> {
    render() {
        if(this.props.listing.categories && this.props.listing.categories.length > 0) {
            return (
                <ListingMetadataSection {...this.props} title="Categories">
                    <ListingCategoryList {...this.props} />
                </ListingMetadataSection>
            );
        }
        return null;
    }
}

interface IListingMetadataSectionProps extends IListingProps {
    title?: any;
}

class ListingMetadataSection extends React.Component<IListingMetadataSectionProps, any> {
    render() {
        //const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        const { title } = this.props;
        return (
            <div className={listingStyles.metadataSection}>
                {title && <h5 className={listingStyles.metadataSectionTitle}>{title}</h5>}
                {React.Children.count(this.props.children) > 0 && (
                    <div className={listingStyles.metadataSectionContent}>
                        {this.props.children}
                    </div>
                )}
            </div>
        );
    }
}

@observer
class ListingBanner extends React.Component<IListingProps, any> {
    render() {
        //const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        const { listing } = this.props;
        return (
            <div className={listingStyles.banner}>
                <ListingBannerIcon listing={listing} />
            </div>
        );
    }
}

@observer
class ListingRating extends React.Component<IListingProps, any> {
    render() {
        //const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        const { listing } = this.props;
        let content;
        let reviewCount;
        if(listing.avg_rate !== undefined && listing.avg_rate > 0) {
            content = <Rating className={listingStyles.ratingStars} min={1} max={5} rating={listing.avg_rate} readOnly={true} ariaLabelFormat="Rated {0} out of {1}" />;
            reviewCount = <div className={listingStyles.reviewCount}>({listing.total_rate1 + listing.total_rate2 + listing.total_rate3 + listing.total_rate4 + listing.total_rate5})</div>;
        } else {
            content = <Rating title="No Reviews Available" min={1} max={5} rating={5} readOnly={true} disabled={true} ariaLabelFormat="No reviews available" />;
        }
        return (
            <div className={listingStyles.rating}>
                {content}{reviewCount}
            </div>
        );
    }
}

class ListingActions extends React.Component<IListingProps, any> {
    private _canUserAccess = (userProfile : IUserProfile) => {
        return UserAdminContext.value(userProfile) || canUserAccess(this.props.listing, userProfile);
    }
    private _onRenderAuth = () => {
        //const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={listingStyles.actions}>
                <ListingBookmarkButton bookmarkList={ListingBookmarkListStore} listing={this.props.listing} />
                <ListingLaunchAction onLaunch={this.props.onLaunch} listing={this.props.listing} />
            </div>
        );
    }
    render() {
        return (
            <UserAuthContainer isAuthorised={this._canUserAccess} onRenderUser={this._onRenderAuth} />
        );
    }
}

@observer
class ListingVersion extends React.Component<IListingProps, any> {
    render() {
        if(this.props.listing.version_name) {
            return (
                <ListingMetadataSection {...this.props} title="Version">
                    {this.props.listing.version_name}
                </ListingMetadataSection>
            );
        }
        return null;
    }
}

@observer
class ListingApprovalStatus extends React.Component<IListingProps, any> {
    render() {
        if(this.props.listing.approval_status) {
            return (
                <ListingMetadataSection {...this.props} title="Approval Status">
                    {this.props.listing.approval_status}
                </ListingMetadataSection>
            );
        }
        return null;
    }
}

interface IListingToggleProps extends IListingProps {
    disabled?: boolean;
}

@observer
class ListingEnabledToggle extends React.Component<IListingToggleProps, any> {
    private _onChange = (e, checked : boolean) => {
        this.props.listing.savedEnabled(checked);
    }
    render() {
        return (
            <Toggle checked={this.props.listing.is_enabled} title={this.props.listing.is_enabled ? "Yes" : "No"} onChange={this._onChange} disabled={this.props.disabled} />
        );
    }
}

class ListingEnabled extends React.Component<IListingProps, any> {
    private _onRenderNonAdmin = () => {
        return <ListingEnabledToggle {...this.props} disabled />
    }
    private _onRenderAdmin = () => {
        return <ListingEnabledToggle {...this.props} />
    }
    render() {
        return (
            <ListingMetadataSection {...this.props} title="Enabled">
                <UserAdminContainer onRenderUser={this._onRenderAdmin} onRenderNonAdmin={this._onRenderNonAdmin} />
            </ListingMetadataSection>
        );
    }
}

@observer
class ListingFeaturedToggle extends React.Component<IListingToggleProps, any> {
    private _onChange = (e, checked : boolean) => {
        this.props.listing.saveFeatured(checked);
    }
    render() {
        return (
            <Toggle checked={this.props.listing.is_featured} title={this.props.listing.is_featured ? "Yes" : "No"} onChange={this._onChange} disabled={this.props.disabled} />
        );
    }
}

@observer
class ListingFeatured extends React.Component<IListingProps, any> {
    private _onRenderNonAdmin = () => {
        return <ListingFeaturedToggle {...this.props} disabled />;
    }
    private _onRenderAdmin = () => {
        return <ListingFeaturedToggle {...this.props} />;
    }
    render() {
        return (
            <ListingMetadataSection {...this.props} title="Featured">
                <UserAdminContainer onRenderUser={this._onRenderAdmin} onRenderNonAdmin={this._onRenderNonAdmin} />
            </ListingMetadataSection>
        );
    }
}

@observer
class ListingSecurity extends React.Component<IListingProps, any> {
    render() {
        if(this.props.listing.security_marking) {
            return (
                <ListingMetadataSection {...this.props} title="Security">
                    {this.props.listing.security_marking}
                </ListingMetadataSection>
            );
        }
        return false;
    }
}

class ListingMetadata extends React.Component<IListingProps, any> {
    render() {
        //const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={listingStyles.metadata}>
                <ListingBanner {...this.props} />
                <ListingActions {...this.props} />
                <ListingRating {...this.props} />
                <ListingVersion {...this.props} />
                <UserAdminContainer>
                    <ListingApprovalStatus {...this.props} />
                </UserAdminContainer>
                <ListingEnabled {...this.props} />
                <ListingFeatured {...this.props} />
                <ListingCategories {...this.props} />
                <ListingSecurity {...this.props} />
            </div>
        );
    }
}

@observer
class ListingTitle extends React.Component<IListingProps, any> {
    render() {
        //const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={listingStyles.title}>
                {this.props.listing.title}
            </div>
        );
    }
}

@observer
class ListingShortDescription extends React.Component<IListingProps, any> {
    render() {
        //const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={listingStyles.shortDescription}>
                {this.props.listing.description_short}
            </div>
        );
    }
}

@observer
class ListingDescription extends React.Component<IListingProps, any> {
    render() {
        //const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={listingStyles.description}>
                {this.props.listing.description}
            </div>
        );
    }
}

class ListingOverview extends React.Component<IListingProps, any> {
    render() {
        //const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={listingStyles.overview}>
                <ListingShortDescription {...this.props} />
                <ListingDescription {...this.props } />
            </div>
        );
    }
}

class ListingDetailTabs extends React.Component<IListingProps, any> {
    render() {
        //const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        const overviewVisible = isNotBlank(this.props.listing.description_short) || isNotBlank(this.props.listing.description);
        const pivotItems = [];
        if(overviewVisible) {
            pivotItems.push(
                <PivotItem key="overview" linkText="Overview">
                    <ListingOverview {...this.props} />
                </PivotItem>
            );
        }
        pivotItems.push(
            <PivotItem key="reviews" linkText="Reviews">
                <ListingReviews {...this.props} />
            </PivotItem>
        );
        pivotItems.push(
            <PivotItem key="activity" linkText="Activity">
                <ListingActivity {...this.props} />
            </PivotItem>
        );
        pivotItems.push(
            <PivotItem key="docs" linkText="Documents">
                <ListingLinks {...this.props} />
            </PivotItem>
        );
        return (
            <div className={listingStyles.detailTabs}>
                <Pivot>
                    {[pivotItems]}
                </Pivot>
            </div>
        );
    }
}

class ListingDetails extends React.Component<IListingProps, any> {
    render() {
        //const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={listingStyles.detailContent}>
                <ListingSaveSyncError {...this.props} />
                <ListingTitle {...this.props} />
                <ListingDetailTabs {...this.props} />
            </div>
        );
    }
}

class Listing extends React.Component<IListingProps, any> {
    render() {
        //const classNames = getClassNames(getStyles(undefined, this.props.styles), this.props.className);
        return (
            <div className={listingStyles.root}>
                <SyncOverlay sync={this.props.listing.saveSync} syncLabel="Please wait..." />
                <ListingMetadata {...this.props} />
                <ListingDetails {...this.props} />
            </div>
        );
    }
}

interface IListingContainerProps {
    listingSupplier: ISyncSupplier<IListingModel>;
    onEdit?: (listing : IListingModel) => void;
    onDelete?: (listing : IListingModel) => void;
    onLaunch?: (listing : IListingModel) => void;
    onSelectCategory?: (category : ICategory) => void;
}

class ListingTitleContainer extends React.Component<IListingContainerProps, any> {
    private _onRenderDone = () => {
        return `${this.props.listingSupplier.value ? this.props.listingSupplier.value.title : ""}`;
    }
    private _onRenderSync = () => {
        return `Loading...`;
    }
    render() {
        return <SyncComponent sync={this.props.listingSupplier.sync} onRenderSync={this._onRenderSync} onRenderDone={this._onRenderDone} />
    }
}

class ListingContainer extends React.Component<IListingContainerProps, any> {
    private _onRenderListing = (listing : IListingModel) => {
        return <Listing key="listing-details"
                        listing={listing}
                        onEdit={this.props.onEdit}
                        onDelete={this.props.onDelete}
                        onLaunch={this.props.onLaunch}
                        onSelectCategory={this.props.onSelectCategory} />;
    }
    render() {
        return <ListingSupplierContainer listingSupplier={this.props.listingSupplier} onRenderListing={this._onRenderListing} />;
    }
}

interface IListingDeleteProps {
    listingSupplier: ISyncSupplier<IListingModel>;
}

@observer
class ListingDeleteDialog extends React.Component<IListingDeleteProps, any> {
    private _onDismiss = () => {
        this.props.listingSupplier.clearValue();
    }
    private _onClickCancel = () => {
        this.props.listingSupplier.clearValue();
    }
    private _onClickConfirm = () => {
        this.props.listingSupplier.value.delete();
        this.props.listingSupplier.clearValue();
    }
    render() {
        const listing = this.props.listingSupplier.value;
        const content = listing ? <div>Are you sure you want to delete <strong>{listing.title}</strong></div> : undefined;
        return (
            <Dialog hidden={listing ? false : true}
                    title={`Delete ${ListingViewConfig.label}`}
                    onDismiss={this._onDismiss}>
                {content}
                <DialogFooter>
                    <DefaultButton onClick={this._onClickCancel}>Cancel</DefaultButton>
                    <PrimaryButton onClick={this._onClickConfirm}>OK</PrimaryButton>
                </DialogFooter>
            </Dialog>
        );
    }
}

export {
    IListingProps,
    IListingContainerProps,
    Listing,
    ListingContainer,
    ListingTitleContainer,
    IListingDeleteProps,
    ListingDeleteDialog
}

