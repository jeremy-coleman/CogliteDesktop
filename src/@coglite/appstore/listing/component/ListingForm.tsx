import { BoundCheckbox, BoundTextField, ISyncSupplier, SyncComponent, ValidationErrors } from '@coglite/apphost';
import { observer } from 'mobx-react';
import {
    DefaultButton,
    Dropdown,
    ICheckboxStyles,
    IDropdownOption,
    PrimaryButton,
    Spinner,
    SpinnerSize,
} from 'office-ui-fabric-react';
import * as React from 'react';

import { CategoryListStore } from '../../category/model/CategoryListStore';
import { ImageField } from '../../media/component/ImageField';
import { IImage } from '../../media/IImage';
import { ListingApprovalStatus } from '../ListingApprovalStatus';
import { IListingModel } from '../model/IListingModel';
import { getClassNames } from './ListingForm.classNames';
import { getStyles, IListingFormStyles } from './ListingForm.styles';
import { ListingLinkForm } from './ListingLinkForm';
import { ListingSaveSyncError } from './ListingSaveSyncError';

interface IListingEditorProps {
    listing: IListingModel;
    onCancel?: () => void;
    onSave?: (listing : IListingModel) => void;
    onSubmitForApproval?: (listing : IListingModel) => void;
    styles?: IListingFormStyles;
    className?: string;
}

interface IListingFormSectionProps {
    title: string;
    className?: string;
    titleClassName?: string;
    bodyClassName?: string;
}

class ListingFormSection extends React.Component<IListingFormSectionProps, any> {
    render() {
        return (
            <div className={this.props.className}>
                <h5 className={this.props.titleClassName}>
                    {this.props.title}
                </h5>
                <div className={this.props.bodyClassName}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

@observer
class ListingImagesEditor extends React.Component<IListingEditorProps, any> {
    private _onSmallIconChanged = (smallIcon : IImage) => {
        this.props.listing.setSmallIcon(smallIcon);
    }
    private _onLargeIconChanged = (largeIcon : IImage) => {
        this.props.listing.setLargeIcon(largeIcon);
    }
    private _onBannerIconChanged = (bannerIcon : IImage) => {
        this.props.listing.setBannerIcon(bannerIcon);
    }
    private _onLargeBannerIconChanged = (largeBannerIcon : IImage) => {
        this.props.listing.setLargeBannerIcon(largeBannerIcon);
    }
    render() {
        return (
            <div>
                <ImageField onChange={this._onSmallIconChanged} image={this.props.listing.small_icon} defaultSelectText="Select Small Icon..." label="Small Icon" width={16} height={16}  />
                <ImageField onChange={this._onLargeIconChanged} image={this.props.listing.large_icon} defaultSelectText="Select Large Icon..." label="Large Icon" width={32} height={32} />
                <ImageField onChange={this._onBannerIconChanged} image={this.props.listing.banner_icon} defaultSelectText="Select Banner Icon..." label="Banner Icon" width={220} height={137} />
                <ImageField onChange={this._onLargeBannerIconChanged} image={this.props.listing.large_banner_icon} defaultSelectText="Select Large Banner Icon..." label="Large Banner Icon" width={1200} height={900} />
            </div>
        );
    }
}

@observer
class ListingCategorySelector extends React.Component<IListingEditorProps, any> {
    componentWillMount() {
        CategoryListStore.load();
    }
    private _onChange = (option : IDropdownOption, index : number) => {
        if(option.selected) {
            this.props.listing.addCategory(option.data);
        } else {
            this.props.listing.removeCategory(option.data);
        }
    }
    render() {
        const options : IDropdownOption[] = [];
        CategoryListStore.itemsView.forEach(c => {
            options.push({
                key: String(c.title),
                text: c.title,
                data: c
            });
        });
        const selectedKeys = this.props.listing.categories.map(c => String(c.title));
        return (
            <Dropdown label="Categories"
                      options={options}
                      onChanged={this._onChange}
                      selectedKeys={selectedKeys}
                      multiSelect />
        );
    }
}

@observer
class ListingEditor extends React.Component<IListingEditorProps, any> {
    render() {
        const { listing, styles, className } = this.props;
        const classNames = getClassNames(getStyles(null, styles), className);
        const inputDisabled = this.props.listing.saveSync.syncing;
        const cbStyles : ICheckboxStyles = {
            root: {
                marginTop: 8
            }
        };
        const validationErrors = listing.validationErrors;
        const approvalStatus = listing.approval_status;
        return (
            <div className={classNames.editor}>
                <BoundTextField label="Title"
                                disabled={inputDisabled}
                                required
                                binding={{ target: listing, key: "title", setter: "setTitle" }}
                                errors={validationErrors} />
                <BoundTextField label="Short Description"
                                disabled={inputDisabled}
                                required={approvalStatus !== ListingApprovalStatus.IN_PROGRESS}
                                binding={{ target: listing, key: "description_short", setter: "setShortDescription" }}
                                errors={validationErrors} />
                <BoundTextField label="Description"
                                disabled={inputDisabled}
                                multiline={true}
                                rows={6}
                                required={approvalStatus !== ListingApprovalStatus.IN_PROGRESS}
                                binding={{ target: listing, key: "description", setter: "setDescription" }}
                                errors={validationErrors} />
                <BoundTextField label="Launch URL"
                                disabled={inputDisabled}
                                required={approvalStatus !== ListingApprovalStatus.IN_PROGRESS}
                                binding={{ target: listing, key: "launch_url", setter: "setLaunchUrl" }}
                                errors={validationErrors} />
                <BoundTextField label="Version"
                                binding={{ target: listing, key: "version_name", setter: "setVersion" }}
                                disabled={inputDisabled}
                                errors={validationErrors} />
                <BoundTextField label="Security"
                                binding={{ target: listing, key: "security_marking", setter: "setSecurityMarking" }}
                                disabled={inputDisabled}
                                errors={validationErrors} />
                <ListingCategorySelector {...this.props} />
                <ListingFormSection title="Images"
                                    className={classNames.section}
                                    titleClassName={classNames.sectionTitle}
                                    bodyClassName={classNames.sectionBody}>
                    <ListingImagesEditor {...this.props} />
                </ListingFormSection>
                <ListingFormSection title="Documents"
                                    className={classNames.section}
                                    titleClassName={classNames.sectionTitle}
                                    bodyClassName={classNames.sectionBody}>
                    <ListingLinkForm listing={listing} />
                </ListingFormSection>
                <ListingFormSection title="Settings"
                                    className={classNames.section}
                                    titleClassName={classNames.sectionTitle}
                                    bodyClassName={classNames.sectionBody}>
                    <BoundCheckbox binding={{ target: listing, key: "is_featured", setter: "setFeatured"}} name="Featured" disabled={inputDisabled} styles={cbStyles} />
                    <BoundCheckbox binding={{ target: listing, key: "is_enabled", setter: "setEnabled"}} name="Enabled" disabled={inputDisabled} styles={cbStyles} />
                    <BoundCheckbox binding={{ target: listing, key: "is_private", setter: "setPrivate" }} name="Private" disabled={inputDisabled} styles={cbStyles} />
                    <BoundCheckbox binding={{ target: listing, key: "iframe_compatible", setter: "setIframeCompatible" }} name="Iframe Compatible" disabled={inputDisabled} styles={cbStyles} />
                </ListingFormSection>
            </div>
        );
    }
}

@observer
class ListingSaveAction extends React.Component<IListingEditorProps, any> {
    private _onClick = () => {
        this.props.onSave(this.props.listing);
    }
    private _onRenderSyncIcon = () => {
        return <Spinner size={SpinnerSize.small} />;
    }
    render() {
        const syncing = this.props.listing.saveSync.syncing;
        const syncSave = this.props.listing.saveSync.type === "save";
        return (
            <PrimaryButton className="action save-action" onClick={this._onClick} iconProps={syncing && syncSave ? undefined : { iconName: "Save" }} onRenderIcon={syncing && syncSave ? this._onRenderSyncIcon : undefined} disabled={syncing}>
                {syncing && syncSave ? "Saving..." : "Save"}
            </PrimaryButton>
        );
    }
}

@observer
class ListingSubmitAction extends React.Component<IListingEditorProps, any> {
    private _onClick = () => {
        this.props.onSubmitForApproval(this.props.listing);
    }
    private _onRenderSyncIcon = () => {
        return <Spinner size={SpinnerSize.small} />;
    }
    render() {
        const { listing } = this.props;
        if(listing.canSubmit) {
            const syncing = listing.saveSync.syncing;
            const syncSubmit = listing.saveSync.type === "submit";
            return (
                <PrimaryButton className="action submit-action"
                                onClick={this._onClick}
                                iconProps={syncing && syncSubmit ? undefined : { iconName: "WorkFlow" }} onRenderIcon={syncing && syncSubmit ? this._onRenderSyncIcon : undefined}
                                disabled={syncing}
                                title="Submit for Approval">
                    {syncing && syncSubmit ? "Submitting for Approval..." : "Submit for Approval"}
                </PrimaryButton>
            );
        }
        return null;
    }
}

@observer
class ListingCancelAction extends React.Component<IListingEditorProps, any> {
    private _onClick = () => {
        this.props.listing.reset();
        if(this.props.onCancel) {
            this.props.onCancel();
        }
    }
    render() {
        return <DefaultButton className="action cancel-action" onClick={this._onClick} disabled={this.props.listing.saveSync.syncing}>Cancel</DefaultButton>;
    }
}

class ListingActions extends React.Component<IListingEditorProps, any> {
    render() {
        const styles = getStyles(undefined, this.props.styles);
        return (
            <div className={getClassNames(styles).actions}>
                {this.props.onCancel ? <ListingCancelAction {...this.props} /> : undefined}
                {this.props.onSave ? <ListingSaveAction {...this.props} /> : undefined}
                {this.props.onSubmitForApproval ? <ListingSubmitAction {...this.props} /> : undefined}
            </div>
        );
    }
}

@observer
class ListingValidationErrors extends React.Component<IListingEditorProps, any> {
    render() {
        return <ValidationErrors errors={this.props.listing.validationErrors} />;
    }
}

class ListingForm extends React.Component<IListingEditorProps, any> {
    render() {
        const styles = getStyles(undefined, this.props.styles);
        return (
            <div className={getClassNames(styles).root}>
                <ListingValidationErrors {...this.props} />
                <ListingSaveSyncError {...this.props} />
                <ListingEditor {...this.props} />
                <ListingActions {...this.props} />
            </div>
        );
    }
}

interface IListingFormContainerProps {
    listingSupplier: ISyncSupplier<IListingModel>;
    onSave?: (listing : IListingModel) => void;
    onSubmitForApproval?: (listing : IListingModel) => void;
    onCancel?: () => void;
}

class ListingFormContainer extends React.Component<IListingFormContainerProps, any> {
    private _onRenderDone = () => {
        return <ListingForm listing={this.props.listingSupplier.value}
                            onCancel={this.props.onCancel}
                            onSave={this.props.onSave}
                            onSubmitForApproval={this.props.onSubmitForApproval} />;
    }
    render() {
        return <SyncComponent sync={this.props.listingSupplier.sync} onRenderDone={this._onRenderDone} />
    }
}

export {
    IListingFormContainerProps,
    IListingEditorProps,
    ListingEditor,
    ListingForm,
    ListingFormContainer
}