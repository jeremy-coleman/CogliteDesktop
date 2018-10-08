import * as React from "react";
import { observer } from "mobx-react";
import { IListing } from "../IListing";
import { IListingModel } from "../model/IListingModel";
import { ISyncSupplier } from "@coglite/apphost";
import { SyncOverlay, SyncComponent } from "@coglite/apphost";
import { IListingStyles, getStyles } from "./Listing.styles";
import { getClassNames } from "./Listing.classNames";
import { Pivot, PivotItem } from "office-ui-fabric-react";
import { Rating } from "office-ui-fabric-react";
import { DefaultButton, PrimaryButton } from "office-ui-fabric-react";
import { ListingSupplierContainer } from "./ListingSupplier";
import { ListingReviewListContainer } from "./ListingReviewList";
import { getReviews } from "../model/ListingReviewHelper";
import { ListingActivityListContainer } from "./ListingActivityList";
import { getActivity } from "../model/ListingActivityHelper";
import { ListingBookmarkListStore } from "../model/ListingBookmarkListStore";
import { Dialog, DialogFooter } from "office-ui-fabric-react";
import { ListingLinks } from "./ListingLinks";
import { IListingBookmarkListModel } from "../model/IListingBookmarkListModel";
import { ListingBookmarkButton } from "./ListingBookmarkButton";
import { ListingLaunchAction } from "./ListingLaunchAction";
import { UserAdminContainer, UserAuthContainer } from "../../user/component/UserAuthContainer";
import { Toggle } from "office-ui-fabric-react";
import { ListingSaveSyncError } from "./ListingSaveSyncError";
import { Link } from "office-ui-fabric-react";
import { ICategory } from "../../category/ICategory";
import { ListingViewConfig } from "./ListingViewConfig";
import { isNotBlank } from "@coglite/apphost";
import { UserAdminContext } from "../../user/UserAdminContext";
import { IUserProfile } from "../../user/IUserProfile";
import { canUserAccess } from "../ListingHelper";
import { ListingBannerIcon } from "./ListingBannerIcon";

interface IListingProps {
    listing: IListingModel;
    adminGroup?: string;
    bookmarkList?: IListingBookmarkListModel;
    onEdit?: (listing : IListingModel) => void;
    onLaunch?: (listing : IListing) => void;
    onDelete?: (listing : IListingModel) => void;
    onSelectCategory?: (category : ICategory) => void;
    styles?: IListingStyles;
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
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        const { title } = this.props;
        return (
            <div className={classNames.metadataSection}>
                {title && <h5 className={classNames.metadataSectionTitle}>{title}</h5>}
                {React.Children.count(this.props.children) > 0 && (
                    <div className={classNames.metadataSectionContent}>
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
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        const { listing } = this.props;
        return (
            <div className={classNames.banner}>
                <ListingBannerIcon listing={listing} />
            </div>
        );
    }
}

@observer
class ListingRating extends React.Component<IListingProps, any> {
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        const { listing } = this.props;
        let content;
        let reviewCount;
        if(listing.avg_rate !== undefined && listing.avg_rate > 0) {
            content = <Rating className={classNames.ratingStars} min={1} max={5} rating={listing.avg_rate} readOnly={true} ariaLabelFormat="Rated {0} out of {1}" />;
            reviewCount = <div className={classNames.reviewCount}>({listing.total_rate1 + listing.total_rate2 + listing.total_rate3 + listing.total_rate4 + listing.total_rate5})</div>;
        } else {
            content = <Rating title="No Reviews Available" min={1} max={5} rating={5} readOnly={true} disabled={true} ariaLabelFormat="No reviews available" />;
        }
        return (
            <div className={classNames.rating}>
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
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={classNames.actions}>
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
    private _onChanged = (checked : boolean) => {
        this.props.listing.savedEnabled(checked);
    }
    render() {
        return (
            <Toggle checked={this.props.listing.is_enabled} title={this.props.listing.is_enabled ? "Yes" : "No"} onChanged={this._onChanged} disabled={this.props.disabled} />
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
    private _onChanged = (checked : boolean) => {
        this.props.listing.saveFeatured(checked);
    }
    render() {
        return (
            <Toggle checked={this.props.listing.is_featured} title={this.props.listing.is_featured ? "Yes" : "No"} onChanged={this._onChanged} disabled={this.props.disabled} />
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
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={classNames.metadata}>
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
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={classNames.title}>
                {this.props.listing.title}
            </div>
        );
    }
}

@observer
class ListingShortDescription extends React.Component<IListingProps, any> {
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={classNames.shortDescription}>
                {this.props.listing.description_short}
            </div>
        );
    }
}

@observer
class ListingDescription extends React.Component<IListingProps, any> {
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={classNames.description}>
                {this.props.listing.description}
            </div>
        );
    }
}

class ListingOverview extends React.Component<IListingProps, any> {
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={classNames.overview}>
                <ListingShortDescription {...this.props} />
                <ListingDescription {...this.props } />
            </div>
        );
    }
}

class ListingDetailTabs extends React.Component<IListingProps, any> {
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
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
            <div className={classNames.detailTabs}>
                <Pivot>
                    {...pivotItems}
                </Pivot>
            </div>
        );
    }
}

class ListingDetails extends React.Component<IListingProps, any> {
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={classNames.detailContent}>
                <ListingSaveSyncError {...this.props} />
                <ListingTitle {...this.props} />
                <ListingDetailTabs {...this.props} />
            </div>
        );
    }
}

class Listing extends React.Component<IListingProps, any> {
    render() {
        const classNames = getClassNames(getStyles(undefined, this.props.styles), this.props.className);
        return (
            <div className={classNames.root}>
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

