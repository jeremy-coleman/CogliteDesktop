import { IBasicAuthCredentials, wordsToCamelCase } from '@coglite/apphost';
import axios from 'axios';

import { IListing } from '../IListing';
import { IListingActivity } from '../IListingActivity';
import { IListingBookmark } from '../IListingBookmark';
import { IListingFeedback } from '../IListingFeedback';
import { IListingReview } from '../IListingReview';
import { IListingStoreFront } from '../IListingStoreFront';
import {
    IListingFeedbackListRequest,
    IListingListCounts,
    IListingListRequest,
    IListingListResponse,
    IListingRequest,
    IListingReviewListRequest,
    IListingReviewRequest,
    IListingSearchRequest,
    IListingService,
} from './IListingService';

const handleError = (error : any) => {
    if(error.response && error.response.status === 400) {
        return Promise.reject({ message: error.message, status: error.response.status, code: "BAD_REQUEST", errors: error.response.data });
    }
    return Promise.reject(error);
};

const createUniqueName = (value : IListing) : string => {
    return wordsToCamelCase(value.title);
};

const Defaults = {
    baseUrl: "/api",
    auth: undefined
};

class RestListingService implements IListingService {
    private _baseUrl : string;
    private _auth : IBasicAuthCredentials; 
    get baseUrl() {
        return this._baseUrl || Defaults.baseUrl;
    }
    set baseUrl(value : string) {
        this._baseUrl = value;
    }
    get auth() {
        return this._auth || Defaults.auth;
    }
    set auth(value : IBasicAuthCredentials) {
        this._auth = value;
    }
    getListing(request : IListingRequest) : Promise<IListing> {
        return axios.get(`${this.baseUrl}/listing/${request.listingId}/`, { auth: this.auth }).then(ar => {
            return ar.data as IListing;
        });
    }
    getListings(request?: IListingListRequest) : Promise<IListingListResponse> {
        return axios.get(`${this.baseUrl}/listing/`, { params: request, auth: this.auth }).then((value) => {
            const r = value.data as any[];
            if(r && r.length > 0) {
                // the last record is the count
                const counts : IListingListCounts = r[r.length - 1];
                const listings : IListing[] = r.slice(0, r.length - 1);
                return { listings: listings, counts: counts };
            }
            return { listings: [], counts: { total: 0 } }
        });
    }
    searchListings(request?: IListingSearchRequest) : Promise<IListing[]> {
        const params = Object.assign({}, request);
        if(!params.search) {
            delete params.search;
        }
        if(!params.category || params.category.length === 0) {
            delete params.category;
        }
        return axios.get(`${this.baseUrl}/listings/search/`, { params: params, auth: this.auth }).then(ar => {
            return ar.data as IListing[];
        });
    }
    saveListing(request : IListing) : Promise<IListing> {
        const ir = Object.assign({}, { unique_name: createUniqueName(request) }, request);
        const p = request.id ?
                    axios.put(`${this.baseUrl}/listing/${request.id}/`, ir, { auth: this.auth }) :
                    axios.post(`${this.baseUrl}/listing/`, ir, { auth: this.auth });
        return p.then(ar => {
            return ar.data as IListing;
        }).catch(handleError);
    }
    deleteListing(request : IListing) : Promise<any> {
        return axios.delete(`${this.baseUrl}/listing/${request.id}/`, { auth: this.auth }).then(ar => {
            return ar.data as IListing;
        }).catch(handleError);
    }
    getBookmarkedListings() : Promise<IListingBookmark[]> {
        return axios.get(`${this.baseUrl}/self/library/`, { auth: this.auth }).then(ar => {
            return ar.data as IListingBookmark[];
        });
    }
    addBookmark(request : IListingBookmark) : Promise<IListingBookmark> {
        return axios.post(`${this.baseUrl}/self/library/`, request, { auth: this.auth }).then(ar => {
            return ar.data as IListingBookmark;
        });
    }
    removeBookmark(request : IListingBookmark) : Promise<IListingBookmark> {
        return axios.delete(`${this.baseUrl}/self/library/${request.id}/`, { auth: this.auth }).then(() => {
            return request;
        });
    }
    getStoreFront() : Promise<IListingStoreFront> {
        return axios.get(`${this.baseUrl}/storefront/`, { auth: this.auth }).then(ar => {
            return ar.data as IListingStoreFront;
        });
    }
    getListingReviews(request : IListingReviewListRequest) : Promise<IListingReview[]> {
        let params;
        if(request.limit !== undefined || request.offset !== undefined || request.ordering !== undefined) {
            params = Object.assign({}, request);
            delete params.listingId;
        }
        return axios.get(`${this.baseUrl}/listing/${request.listingId}/review/`, { params: params, auth: this.auth }).then(ar => {
            return ar.data as IListingReview[];
        });
    }
    getListingReview(request : IListingReviewRequest) : Promise<IListingReview> {
        return axios.get(`${this.baseUrl}/listing/${request.listingId}/review/${request.reviewId}/`, { auth: this.auth }).then(ar => {
            return ar.data as IListingReview;
        });
    }
    deleteListingReview(request : IListingReviewRequest) : Promise<any> {
        return axios.delete(`${this.baseUrl}/listing/${request.listingId}/review/${request.reviewId}/`, { auth: this.auth });
    }
    saveListingReview(request : IListingReview) : Promise<IListingReview> {
        const p = request.id ?
            axios.put(`${this.baseUrl}/listing/${request.listing}/review/${request.id}/`, request, { auth: this.auth }) :
            axios.post(`${this.baseUrl}/listing/${request.listing}/review/`, request, { auth: this.auth });
        return p.then(ar => {
            return ar.data as IListingReview;
        }).catch(handleError);
    }
    getListingFeedback(request : IListingFeedbackListRequest) : Promise<IListingFeedback[]> {
        let params;
        if(request.limit !== undefined || request.offset !== undefined) {
            params = Object.assign({}, request);
            delete params.listingId;
        }
        return axios.get(`${this.baseUrl}/listing/${request.listingId}/feedback/`, { params: params, auth: this.auth }).then(ar => {
            return ar.data as IListingFeedback[];
        });
    }
    getListingActivity(request : IListingRequest) : Promise<IListingActivity[]> {
        return axios.get(`${this.baseUrl}/listing/${request.listingId}/activity/`, { auth: this.auth }).then(ar => {
            return ar.data as IListingActivity[];
        });
    }
}

export { RestListingService, Defaults }
