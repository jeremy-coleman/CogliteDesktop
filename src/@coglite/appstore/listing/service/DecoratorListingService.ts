import { IConsumerFunc } from '@coglite/apphost';

import {
    IListing,
    IListingActivity,
    IListingBookmark,
    IListingFeedback,
    IListingFeedbackListRequest,
    IListingListRequest,
    IListingListResponse,
    IListingRequest,
    IListingReview,
    IListingReviewListRequest,
    IListingReviewRequest,
    IListingSearchRequest,
    IListingService,
    IListingStoreFront,
} from '../types';

interface IDecoratorListingServiceOpts {
    target: IListingService;
    decorator?: IConsumerFunc<IListing>;
}

class DecoratorListingService implements IListingService {
    private _target : IListingService;
    private _decorator : IConsumerFunc<IListing>;
    constructor(opts?: IDecoratorListingServiceOpts) {
        this.target = opts ? opts.target : undefined;
        this.decorator = opts ? opts.decorator : undefined;
    }
    get target() {
        return this._target;
    }
    set target(value) {
        this._target = value;
    }
    get decorator() : IConsumerFunc<IListing> {
        return this._decorator;
    }
    set decorator(value) {
        this._decorator = value;
    }
    private _decorate = (listing : IListing) => {
        if(listing && this._decorator) {
            this._decorator(listing);
        }
    }
    async getListing(request : IListingRequest) : Promise<IListing> {
        const r = await this.target.getListing(request);
        this._decorate(r);
        return r;
    }
    async saveListing(request : IListing) : Promise<IListing> {
        const r = await this.target.saveListing(request);
        this._decorate(r);
        return r;
    }
    deleteListing(request : IListing) : Promise<any> {
        return this.target.deleteListing(request);
    }
    async getListings(request?: IListingListRequest) : Promise<IListingListResponse> {
        const r = await this.target.getListings(request);
        if(r && r.listings) {
            r.listings.forEach(this._decorate);
        }
        return r;
    }
    async searchListings(request?: IListingSearchRequest) : Promise<IListing[]> {
        const r = await this.target.searchListings(request);
        if(r) {
            r.forEach(this._decorate);
        }
        return r;
    }
    async getBookmarkedListings() : Promise<IListingBookmark[]> {
        const r = await this.target.getBookmarkedListings();
        if(r) {
            r.forEach(b => {
                this._decorate(b.listing);
            });
        }
        return r;
    }
    async addBookmark(request: IListingBookmark) : Promise<IListingBookmark> {
        const r = await this.target.addBookmark(request);
        if(r) {
            this._decorate(r.listing);
        }
        return r;
    }
    async removeBookmark(request: IListingBookmark) : Promise<IListingBookmark> {
        const r = await this.target.removeBookmark(request);
        if(r) {
            this._decorate(r.listing);
        }
        return r;
    }
    async getStoreFront() : Promise<IListingStoreFront> {
        const r = await this.target.getStoreFront();
        if(r) {
            if(r.featured) {
                r.featured.forEach(this._decorate);
            }
            if(r.most_popular) {
                r.most_popular.forEach(this._decorate);
            }
            if(r.recent) {
                r.recent.forEach(this._decorate);
            }
            if(r.recommended) {
                r.recommended.forEach(this._decorate);
            }
        }
        return r;
    }
    getListingReviews(request : IListingReviewListRequest) : Promise<IListingReview[]> {
        return this.target.getListingReviews(request);
    }
    getListingReview(request : IListingReviewRequest) : Promise<IListingReview> {
        return this.target.getListingReview(request);
    }
    deleteListingReview(request : IListingReviewRequest) : Promise<any> {
        return this.target.deleteListingReview(request);
    }
    saveListingReview(review : IListingReview) : Promise<IListingReview> {
        return this.target.saveListingReview(review);
    }
    getListingFeedback(request : IListingFeedbackListRequest) : Promise<IListingFeedback[]> {
        return this.target.getListingFeedback(request);
    }
    async getListingActivity(request : IListingRequest) : Promise<IListingActivity[]> {
        const r = await this.target.getListingActivity(request);
        if(r) {
            r.forEach(a => {
                this._decorate(a.listing);
            });
        }
        return r;
    }
}

export {
    IDecoratorListingServiceOpts,
    DecoratorListingService
}