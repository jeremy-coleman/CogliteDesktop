import { IListing } from "../IListing";
import { IListingBookmark } from "../IListingBookmark";
import { IListingStoreFront } from "../IListingStoreFront";
import { IListingReview } from "../IListingReview";
import { IListingFeedback } from "../IListingFeedback";
import { IListingActivity } from "../IListingActivity";
import { IListingSearchRequest } from "../IListingSearchRequest";

interface IListingByIdRequest {
    listingId: string | number;
}

interface IListingRequest extends IListingByIdRequest {}

interface IListingListRequest extends IListingSearchRequest {
    ordering?: string;
}

interface IListingListOrgCounts {
    [key : string] : number;
}

interface IListingListCounts {
    total?: number;
    enabled?: number;
    organizations?: IListingListOrgCounts;
    [key : string] : any;
}

interface IListingListResponse {
    listings?: IListing[];
    counts?: IListingListCounts;
}

interface IListingReviewListRequest extends IListingByIdRequest {
    offset?: number;
    limit?: number;
    ordering?: string;
}

interface IListingReviewRequest extends IListingByIdRequest {
    reviewId: number;
}

interface IListingFeedbackListRequest extends IListingByIdRequest {
    offset?: number;
    limit?: number;
}

interface IListingService {
    getListing(request : IListingRequest) : Promise<IListing>;
    saveListing(request : IListing) : Promise<IListing>;
    deleteListing(request : IListing) : Promise<any>;
    getListings(request?: IListingListRequest) : Promise<IListingListResponse>;
    searchListings(request?: IListingSearchRequest) : Promise<IListing[]>;
    getBookmarkedListings() : Promise<IListingBookmark[]>;
    addBookmark(request: IListingBookmark) : Promise<IListingBookmark>;
    removeBookmark(request: IListingBookmark) : Promise<IListingBookmark>;
    getStoreFront() : Promise<IListingStoreFront>;
    getListingReviews(request : IListingReviewListRequest) : Promise<IListingReview[]>;
    getListingReview(request : IListingReviewRequest) : Promise<IListingReview>;
    deleteListingReview(request : IListingReviewRequest) : Promise<any>;
    saveListingReview(review : IListingReview) : Promise<IListingReview>;
    getListingFeedback(request : IListingFeedbackListRequest) : Promise<IListingFeedback[]>;
    getListingActivity(request : IListingRequest) : Promise<IListingActivity[]>;
}

export {
    IListingByIdRequest,
    IListingRequest,
    IListingListRequest,
    IListingListResponse,
    IListingListOrgCounts,
    IListingListCounts,
    IListingSearchRequest,
    IListingReviewListRequest,
    IListingFeedbackListRequest,
    IListingReviewRequest,
    IListingService
}