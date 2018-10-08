import { IError, IStateManager, ISyncModel } from '@coglite/apphost';

import { ICategory } from '../../category/ICategory';
import { IImage } from '../../media/IImage';
import { IListing } from '../IListing';
import { ListingApprovalStatus } from '../ListingApprovalStatus';
import { IListingLinkModel } from './IListingLinkModel';

interface IListingModel extends IListing, IStateManager {
    validationErrors: IError[];
    valid: boolean;
    saveSync : ISyncModel;
    state : any;
    doc_urls : IListingLinkModel[];
    data : IListing;
    canSubmit : boolean;
    setTitle(title : string) : void;
    setDescription(description : string) : void;
    setShortDescription(shortDescription : string) : void;
    setEnabled(enabled : boolean) : void;
    setFeatured(featured : boolean) : void;
    setPrivate(prv : boolean) : void;
    setLaunchUrl(url : string) : void;
    setSecurityMarking(securityMarking : string) : void;
    setVersion(version : string) : void;
    setApprovalStatus(status : ListingApprovalStatus) : void;
    setSmallIcon(smallIcon : IImage) : void;
    setLargeIcon(largeIcon : IImage) : void;
    setBannerIcon(bannerIcon : IImage) : void;
    setLargeBannerIcon(largeBannerIcon : IImage) : void;
    setCategories(categories : ICategory[]) : void;
    addCategory(category : ICategory) : void;
    removeCategory(category : ICategory) : void;
    submitForApproval() : Promise<any>;
    approve() : Promise<any>;
    reject() : Promise<any>;
    save() : Promise<any>;
    delete() : Promise<any>;
    reset() : void;
    addLink() : void;
    removeLink(link : IListingLinkModel) : void;
    enable() : Promise<any>;
    disable() : Promise<any>;
    savedEnabled(enabled : boolean) : Promise<any>;
    saveFeatured(featured : boolean) : Promise<any>;
    setIframeCompatible(iframeCompatible : boolean) : void;
    setData(data : IListing) : void;
}

export { IListingModel }