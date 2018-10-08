import { IError, isBlank, StateManager, SyncModel } from '@coglite/apphost';
import { action, computed, observable } from 'mobx';

import { ICategory } from '../../category/ICategory';
import { IImage } from '../../media/IImage';
import { IScreenShot } from '../../media/IScreenShot';
import { ImageServiceContext } from '../../media/service/ImageServiceContext';
import { IUserProfile } from '../../user/IUserProfile';
import { IListing } from '../IListing';
import { ListingApprovalStatus } from '../ListingApprovalStatus';
import { IListingService } from '../service/IListingService';
import { ListingServiceContext } from '../service/ListingServiceContext';
import { IListingModel } from './IListingModel';
import { ListingLinkModel } from './ListingLinkModel';

class ListingModel extends StateManager implements IListingModel {
    private _lastData : IListing;
    @observable validationErrors : IError[] = [];
    @observable saveSync = new SyncModel();
    @observable id: number;
    @observable title: string;
    @observable description: string;
    @observable description_short : string;
    @observable is_enabled: boolean = true;
    @observable is_featured: boolean = false;
    @observable is_private : boolean = false;
    @observable launch_url: string;
    @observable security_marking: string;
    @observable owners : IUserProfile[] = [];
    @observable version_name : string = "1";
    @observable approval_status : ListingApprovalStatus = ListingApprovalStatus.IN_PROGRESS;
    @observable small_icon : IImage;
    @observable large_icon : IImage;
    @observable banner_icon : IImage;
    @observable large_banner_icon : IImage;
    @observable requirements : string = "None";
    @observable what_is_new : string = "Nothing";
    @observable screenshots : IScreenShot[] = [];
    @observable is_bookmarked : boolean = false;
    @observable is_deleted: boolean = false;
    @observable avg_rate: number;
    @observable total_votes: number;
    @observable total_rate5: number;
    @observable total_rate4: number;
    @observable total_rate3: number;
    @observable total_rate2: number;
    @observable total_rate1: number;
    @observable total_reviews: number;
    @observable total_review_responses: number;
    @observable feedback_score: number;
    @observable doc_urls : ListingLinkModel[] = [];
    @observable categories : ICategory[] = [];
    @observable iframe_compatible : boolean = true;

    private _listingService : IListingService;

    constructor(data?: IListing) {
        super();
        if(data) {
            this.setData(data);
        }
    }

    get listingService() {
        return this._listingService || ListingServiceContext.value;
    }
    set listingService(value : IListingService) {
        this._listingService = value;
    }

    @computed
    get valid() {
        return this.validationErrors.length === 0 &&
                this.doc_urls.every(doc => doc.valid);
    }
    
    @computed
    get data() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            description_short: this.description_short,
            is_enabled: this.is_enabled,
            is_featured: this.is_featured,
            is_private: this.is_private,
            launch_url: this.launch_url,
            security_marking: this.security_marking,
            owners: this.owners ? this.owners.slice(0) : [],
            version_name: this.version_name,
            approval_status: this.approval_status,
            small_icon: this.small_icon || null,
            large_icon: this.large_icon || null,
            banner_icon: this.banner_icon || null,
            large_banner_icon: this.large_banner_icon || null,
            requirements: this.requirements,
            what_is_new: this.what_is_new,
            screenshots: this.screenshots ? this.screenshots.slice(0) : [],
            is_bookmarked: this.is_bookmarked,
            is_deleted: this.is_deleted,
            avg_rate: this.avg_rate,
            total_votes: this.total_votes,
            total_rate5: this.total_rate5,
            total_rate4: this.total_rate4,
            total_rate3: this.total_rate3,
            total_rate2: this.total_rate2,
            total_rate1: this.total_rate1,
            total_reviews: this.total_reviews,
            total_review_responses: this.total_review_responses,
            feedback_score: this.feedback_score,
            doc_urls: this.doc_urls.map(i => i.data),
            categories: this.categories.slice(0)
        };
    }
    set data(value) {
        this.setData(value);
    }

    @action
    setData(data : IListing) {
        this._lastData = data;
        this.id = data ? data.id : undefined;
        this.title = data ? data.title : undefined;
        this.description = data ? data.description : undefined;
        this.description_short = data ? data.description_short : undefined;
        this.is_enabled = data ? data.is_enabled : true;
        this.is_featured = data ? data.is_featured : false;
        this.is_private = data ? data.is_private : false;
        this.launch_url = data ? data.launch_url : undefined;
        this.security_marking = data ? data.security_marking : undefined;
        this.owners = data && data.owners ? data.owners.slice(0) : [];
        this.version_name = data ? data.version_name : undefined;
        this.approval_status = data ? data.approval_status : undefined;
        this.small_icon = data ? data.small_icon : undefined;
        this.large_icon = data ? data.large_icon : undefined;
        this.banner_icon = data ? data.banner_icon : undefined;
        this.large_banner_icon = data ? data.large_banner_icon : undefined;
        this.requirements = data ? data.requirements : "None";
        this.what_is_new = data ? data.what_is_new : "Nothing";
        this.screenshots = data && data.screenshots ? data.screenshots.slice(0) : [],
        this.is_bookmarked = data ? data.is_bookmarked : undefined;
        this.is_deleted = data ? data.is_deleted :undefined;
        this.avg_rate = data ? data.avg_rate : undefined;
        this.total_votes = data ? data.total_votes : undefined;
        this.total_rate5 = data ? data.total_rate5 : undefined;
        this.total_rate4 = data ? data.total_rate4 : undefined;
        this.total_rate3 = data ? data.total_rate3 : undefined;
        this.total_rate2 = data ? data.total_rate2 : undefined;
        this.total_rate1 = data ? data.total_rate1 : undefined;
        this.total_reviews = data ? data.total_reviews : undefined;
        this.total_review_responses = data ? data.total_review_responses : undefined;
        this.feedback_score = data ? data.feedback_score : undefined;
        this.doc_urls = data && data.doc_urls ? data.doc_urls.map(i => new ListingLinkModel(this, i)) : [];
        this.setCategories(data ? data.categories : []);
    }

    @action
    reset() {
        this.setData(this._lastData);
    }

    @action
    setTitle(title : string) : void {
        this.title = title;
    }

    @action
    setDescription(description : string) : void {
        this.description = description;
    }

    @action
    setShortDescription(shortDescription : string) : void {
        this.description_short = shortDescription;
    }

    @action
    setEnabled(enabled : boolean) : void {
        this.is_enabled = enabled;
    }

    @action
    setFeatured(featured : boolean) : void {
        this.is_featured = featured;
    }

    @action
    setPrivate(prv : boolean) : void {
        this.is_private = prv;
    }

    @action
    setLaunchUrl(launchUrl : string) : void {
        this.launch_url = launchUrl;
    }

    @action
    setSecurityMarking(securityMarking : string) : void {
        this.security_marking = securityMarking;
    }

    @action
    setVersion(version : string) {
        this.version_name = version;
    }

    @action
    setApprovalStatus(approvalStatus : ListingApprovalStatus) {
        this.approval_status = approvalStatus;
    }

    @action
    setSmallIcon(smallIcon : IImage) {
        this.small_icon = smallIcon;
    }
   
    @action
    setLargeIcon(largeIcon : IImage) {
        this.large_icon = largeIcon;
    }

    @action
    setBannerIcon(bannerIcon : IImage) {
        this.banner_icon = bannerIcon;
    }

    @action
    setLargeBannerIcon(largeBannerIcon : IImage) {
        this.large_banner_icon = largeBannerIcon;
    }

    @action
    setCategories(categories : ICategory[]) {
        this.categories = [];
        if(categories) {
            categories.forEach(c => this.categories.push(c));
        }
    }

    @action
    addCategory(category : ICategory) : void {
       if(category) {
           this.categories.push(category);
       }
    }

    @action
    removeCategory(category : ICategory) : void {
        if(category) {
            const idx = this.categories.findIndex(c => c.id === category.id || c.title === category.title);
            if(idx >= 0) {
                this.categories.splice(idx, 1);
            }
        }
    }

    @action
    private _onSaveDone = (data : IListing) => {
        this.setData(data);
        this.saveSync.syncEnd();
    }

    @action
    private _onSyncError = (error) => {
        this.saveSync.syncError(error);
    }

    private _saveImage(image : IImage, imageType : string) : Promise<IImage> {
        const imageForSave = Object.assign({ image_type: imageType, security_marking: "UNCLASSIFIED" }, image);
        return ImageServiceContext.value.saveImage(imageForSave).then(saved => {
            const r = Object.assign({}, saved, imageForSave, { url: ImageServiceContext.value.getImageUrl({ id: saved.id })});
            delete r.file;
            return r;
        });
    }

    @action
    private _saveSmallIcon() : Promise<any> {
        return this.small_icon && this.small_icon.file ? this._saveImage(this.small_icon, "small_icon").then(image => {
            this.setSmallIcon(image);
        }) : Promise.resolve();
    }

    @action
    private _saveLargeIcon() : Promise<any> {
        return this.large_icon && this.large_icon.file ? this._saveImage(this.large_icon, "large_icon").then(image => {
            this.setLargeIcon(image);
        }) : Promise.resolve();
    }

    @action
    private _saveBannerIcon() : Promise<any> {
        return this.banner_icon && this.banner_icon.file ? this._saveImage(this.banner_icon, "banner_icon").then(image => {
            this.setBannerIcon(image);
        }) : Promise.resolve();
    }

    @action
    private _saveLargeBannerIcon() : Promise<any> {
        return this.large_banner_icon && this.large_banner_icon.file ? this._saveImage(this.large_banner_icon, "large_banner_icon").then(image => {
            this.setLargeBannerIcon(image);
        }) : Promise.resolve();
    }

    @action
    private _saveImages() {
        return Promise.all([
            this._saveSmallIcon(),
            this._saveLargeIcon(),
            this._saveBannerIcon(),
            this._saveLargeBannerIcon()
        ]).catch(error => {
            return Promise.reject({ message: `Unable to save images - ${error.message}`, cause: error });
        });
    }

    @action
    approve() {
        return this._saveInternal("approve", ListingApprovalStatus.APPROVED);
    }

    @action
    reject() {
        return this._saveInternal("reject", ListingApprovalStatus.REJECTED);
    }

    @computed
    get canSubmit() {
        if(this.approval_status === ListingApprovalStatus.IN_PROGRESS || this.approval_status === ListingApprovalStatus.REJECTED) {
            const validationErrors : IError[] = [];
            this._validateDetails(ListingApprovalStatus.PENDING, validationErrors);
            return validationErrors.length === 0;
        }
        return false;
    }

    @action
    submitForApproval() {
        return this._saveInternal("submit", ListingApprovalStatus.PENDING);
    }

    private _onDeleteDone = () => {
        return this.listingService.getListing({ listingId: this.id }).then(this._onSaveDone);
    }

    @action
    delete() {
        this.saveSync.syncStart({ type: "delete" });
        return this.listingService.deleteListing({ id: this.id }).then(this._onDeleteDone).catch(this._onSyncError);
    }

    private _validateDetails(approvalStatus : ListingApprovalStatus, validationErrors: IError[]) {
        // NOTE that validation errors have to be moved to a core object with codes to access
        // a title is always required
        if(isBlank(this.title)) {
            validationErrors.push({ key: "title", keyTitle: "Title", message: "Title is required"});
        }

        // any other state after in progress requires a short description, description and launch url
        if(approvalStatus !== ListingApprovalStatus.IN_PROGRESS) {
            if(isBlank(this.launch_url)) {
                validationErrors.push({ key: "launch_url", keyTitle: "Launch URL", message: "Launch URL is required" });
            }
            if(isBlank(this.description_short)) {
                validationErrors.push({ key: "description_short", keyTitle: "Short Description", message: "Short Description is required" });
            }
            if(isBlank(this.description)) {
                validationErrors.push({ key: "description", keyTitle: "Description", message: "Description is required"});
            }
        }
    }

    @action
    validate(approvalStatus : ListingApprovalStatus) {
        this.validationErrors = [];
        this._validateDetails(approvalStatus, this.validationErrors);
        // validate each doc url
        if(this.doc_urls) {
            this.doc_urls.forEach(doc => doc.validate());
        }
    }

    @action
    private _saveDetails(updated?: IListing) {
        this.saveSync.syncStart({ type: "save" });
        const request : IListing = Object.assign({}, this.data, updated);
        return this.listingService.saveListing(request).then(this._onSaveDone).catch(err => {
            this._onSyncError(err)
            return Promise.reject(err);
        });
    }

    @action
    private _saveInternal(type: string, approvalStatus : ListingApprovalStatus) {
        this.validate(approvalStatus);
        if(!this.valid) {
            return Promise.reject({ code: "VALIDATION_ERROR", errors: this.validationErrors.slice(0) });
        }
        this.saveSync.syncStart({ type: type });
        return this._saveImages().then(() => {
            const request : IListing = Object.assign({}, this.data, { approval_status: approvalStatus });
            return this.listingService.saveListing(request);
        }).then(this._onSaveDone).catch(err => {
            this._onSyncError(err)
            return Promise.reject(err);
        });
    }

    
    
    @action
    save() {
        return this._saveInternal("save", this.approval_status);
    }

    @action
    addLink() {
        this.doc_urls.push(new ListingLinkModel(this));
    }

    @action
    removeLink(doc) : void {
        const idx = this.doc_urls.indexOf(doc);
        if(idx >= 0) {
            this.doc_urls.splice(idx, 1);
        }
    }

    @action
    enable() : Promise<any> {
        return this.savedEnabled(true);
    }

    @action
    disable() : Promise<any> {
        return this.savedEnabled(false);
    }

    @action
    savedEnabled(enabled : boolean) : Promise<any> {
        return this._saveDetails({ is_enabled: enabled });
    }

    @action
    saveFeatured(featured : boolean) : Promise<any> {
        return this._saveDetails({ is_featured: featured });
    }

    @action
    setIframeCompatible(iframeCompatible : boolean) {
        this.iframe_compatible = iframeCompatible;
    }
}

export { ListingModel as default, ListingModel }