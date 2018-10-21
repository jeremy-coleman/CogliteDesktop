import { IListingModel, IListingReviewListModel } from '../types';
import { ListingReviewListModel } from './ListingReviewListModel';

const getReviews = (listing : IListingModel) : IListingReviewListModel => {
    return listing.getState("reviews", () => {
        return new ListingReviewListModel(listing);
    });
};

export { getReviews }