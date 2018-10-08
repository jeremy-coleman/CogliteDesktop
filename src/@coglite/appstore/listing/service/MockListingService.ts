import { IListing } from "../IListing";
import { IListingBookmark } from "../IListingBookmark";
import { IListingStoreFront } from "../IListingStoreFront";
import { IListingReview } from "../IListingReview";
import { IListingActivity } from "../IListingActivity";
import { IListingFeedback } from "../IListingFeedback";
import { ListingApprovalStatus } from "../ListingApprovalStatus";
import {
    IListingService,
    IListingRequest,
    IListingListRequest,
    IListingListResponse,
    IListingSearchRequest,
    IListingReviewRequest,
    IListingReviewListRequest,
    IListingFeedbackListRequest
} from "./IListingService";
import { ListingActivityAction } from "../ListingActivityAction";
import { MockUserProfile } from "../../user/service/MockUserService";

const state = { listingId: 1, listingBookmarkId: 1 };

const nextListingId = () : number => {
    const r = state.listingId;
    state.listingId ++;
    return r;
};

const nextListingBookmarkid = () : number => {
    const r = state.listingBookmarkId;
    state.listingBookmarkId ++;
    return r;
}

const listingNotFound = (listingId : string | number) : Promise<any> => {
    return Promise.reject({ code: "NOT_FOUND", message: `Unable to find listing by id: ${listingId}`});
};

class MockListingService implements IListingService {
    private _listings : IListing[] = [
        {
            id: nextListingId(),
            unique_name: "kurtvonnegut",
            title: "Kurt Vonnegut",
            description: "Kurt Vonnegut",
            description_short: "Kurt Vonnegut",
            launch_url: "https://en.wikipedia.org/wiki/Kurt_Vonnegut",
            security_marking: "user",
            approval_status: ListingApprovalStatus.APPROVED,
            is_enabled: true
        },
        {
            id: nextListingId(),
            unique_name: "johnsteinbeck",
            title: "John Steinbeck",
            description: "John Steinbeck",
            description_short: "John Steinbeck",
            launch_url: "https://en.wikipedia.org/wiki/John_Steinbeck",
            security_marking: "user",
            approval_status: ListingApprovalStatus.APPROVED,
            is_enabled: true
        },
        {
            id: nextListingId(),
            unique_name: "aldoushuxley",
            title: "Aldous Huxley",
            description: "Aldous Huxley",
            description_short: "Aldous Huxley",
            launch_url: "https://en.wikipedia.org/wiki/Aldous_Huxley",
            security_marking: "user",
            approval_status: ListingApprovalStatus.APPROVED,
            is_enabled: true
        },
        {
            id: nextListingId(),
            unique_name: "georgeorwell",
            title: "George Orwell",
            description: "George Orwell",
            description_short: "George Orwell",
            launch_url: "https://en.wikipedia.org/wiki/George_Orwell",
            security_marking: "user",
            approval_status: ListingApprovalStatus.APPROVED,
            is_enabled: true
        },
        {
            id: nextListingId(),
            unique_name: "mcdonalds",
            title: "McDonald's",
            description: "McDonald's",
            description_short: "McDonald's",
            launch_url: "https://en.wikipedia.org/wiki/McDonald%27s",
            security_marking: "user",
            approval_status: ListingApprovalStatus.IN_PROGRESS,
            is_enabled: true
        },
        {
            id: nextListingId(),
            unique_name: "chocolate",
            title: "Chocolate",
            description: "Chocolate",
            description_short: "Chocolate",
            launch_url: "https://en.wikipedia.org/wiki/Chocolate",
            security_marking: "user",
            approval_status: ListingApprovalStatus.PENDING,
            is_enabled: true
        }
    ];
    private _bookmarks : IListingBookmark[] = [];
    set listings(listings : IListing[]) {
        this._listings = listings || [];
    }
    set bookmarks(bookmarks : IListingBookmark[]) {
        this._bookmarks = bookmarks || [];
    }
    getListing(request : IListingRequest) : Promise<IListing> {
        const r = this._listings.find(l => String(l.id) === String(request.listingId));
        return r ? Promise.resolve(Object.assign({}, r)) : listingNotFound(request.listingId);
    }
    saveListing(request : IListing) : Promise<IListing> {
        if(request.id) {
            const idx = this._listings.findIndex(l => l.id === request.id);
            if(idx >= 0) {
                this._listings[idx] = Object.assign({}, this._listings[idx], request);
                return Promise.resolve(Object.assign({}, this._listings[idx]));
            }
            return listingNotFound(request.id);
        }
        const newListing = Object.assign({}, request, { id: nextListingId(), unique_name: request.title });
        this._listings.push(newListing);
        return Promise.resolve(Object.assign({}, newListing));
    }
    deleteListing(request : IListing) : Promise<any> {
        if(request.id) {
            const idx = this._listings.findIndex(l => l.id === request.id);
            if(idx >= 0) {
                this._listings.splice(idx, 1);
                return Promise.resolve();
            }
            return listingNotFound(request.id);
        }
        return Promise.reject({ code: "INVALID_ARGUMENT", key: "id", message: "Listing id not provided"});
    }
    getListings(request?: IListingListRequest) : Promise<IListingListResponse> {
        return Promise.resolve({
            listings: this._listings.map(listing => Object.assign({}, listing)),
            counts: {
                total: this._listings.length,
                enabled: this._listings.filter(l => l.is_enabled).length
            }
        });
    }
    searchListings(request?: IListingSearchRequest) : Promise<IListing[]> {
        return Promise.resolve([].concat(this._listings));
    }
    getBookmarkedListings() : Promise<IListingBookmark[]> {
        const bookmarks = this._bookmarks.map(b => {
            return {
                id: b.id,
                listing: Object.assign({}, this._listings.find(l => l.id === b.listing.id))
            };
        });
        return Promise.resolve(bookmarks);
    }
    addBookmark(request: IListingBookmark) : Promise<IListingBookmark> {
        const listing = this._listings.find(l => request.listing && request.listing.id === l.id);
        if(listing) {
            const r : IListingBookmark = { id: nextListingBookmarkid(), listing: Object.assign({}, listing) };
            this._bookmarks.push(r);
            return Promise.resolve(Object.assign({}, r));
        }
        return listingNotFound(request.listing ? request.listing.id : undefined);
    }
    removeBookmark(request: IListingBookmark) : Promise<IListingBookmark> {
        const idx = this._bookmarks.findIndex(b => request.listing && request.listing.id === b.listing.id);
        if(idx >= 0) {
            const r = this._bookmarks[idx];
            this._bookmarks.splice(idx, 1);
            return Promise.resolve(Object.assign({}, r));
        }
        return Promise.reject({ code: "NOT_FOUND", message: "Bookmark not found"});
    }
    getStoreFront() : Promise<IListingStoreFront> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const r = this._listings.map(l => Object.assign({}, l));
                resolve({
                    featured: r,
                    most_popular: r,
                    recent: r,
                    recommended: r
                });
            }, 1000);
        });
    }
    getListingReviews(request : IListingReviewListRequest) : Promise<IListingReview[]> {
        return Promise.resolve(null);
    }
    getListingReview(request : IListingReviewRequest) : Promise<IListingReview> {
        return Promise.resolve(null);
    }
    deleteListingReview(request : IListingReviewRequest) : Promise<any> {
        return Promise.resolve(null);
    }
    saveListingReview(review : IListingReview) : Promise<IListingReview> {
        return Promise.resolve(null);
    }
    getListingFeedback(request : IListingFeedbackListRequest) : Promise<IListingFeedback[]> {
        return Promise.resolve(null);
    }
    getListingActivity(request : IListingRequest) : Promise<IListingActivity[]> {
        const r = this._listings.find(l => String(l.id) === String(request.listingId));
        let activities : IListingActivity[] = [];
        if(r) {
            activities.push(
                {
                    action: ListingActivityAction.CREATED,
                    activity_date: "2016-03-01T14:32:22.666Z",
                    description: "",
                    author: MockUserProfile,
                    listing: r,
                    change_details: [
                        {   
                            field_name: "listing_type",
                            old_value: "",
                            new_value: "Widget"
                        },
                        {
                            field_name: "categories",
                            old_value: "['Security Analyst Applications']",
                            new_value: "[]"
                        },
                        {
                            field_name: "doc_urls",
                            old_value: "[]",
                            new_value: "[('Help', 'http://www.google.com')]"
                        }
                    ]
                },
                {
                    action: ListingActivityAction.MODIFIED,
                    activity_date: "2017-01-01T14:32:22.666Z",
                    description: "",
                    author: MockUserProfile,
                    listing: r,
                    change_details: [
                        {   
                            field_name: "listing_type",
                            old_value: "",
                            new_value: "Widget"
                        },
                        {
                            field_name: "categories",
                            old_value: "['Security Analyst Applications']",
                            new_value: "[]"
                        },
                        {
                            field_name: "doc_urls",
                            old_value: "[]",
                            new_value: "[('Help', 'http://www.google.com')]"
                        }
                    ]
                },
                {
                    action: ListingActivityAction.MODIFIED,
                    activity_date: "2017-01-03T14:32:22.666Z",
                    description: "",
                    author: MockUserProfile,
                    listing: r,
                    change_details: [
                        {   
                            field_name: "launch_url",
                            old_value: "http://poopoo/entity/search",
                            new_value: "/entity/search"
                        }
                    ]
                }
            );
        }
        return Promise.resolve(activities);
    }
}

export { MockListingService, nextListingId, nextListingBookmarkid }