import { IListingModel } from "./IListingModel";
import { IListingReviewListModel } from "./IListingReviewListModel";
import { ListingReviewListModel } from "./ListingReviewListModel";

const getReviews = (listing : IListingModel) : IListingReviewListModel => {
    return listing.getState("reviews", () => {
        return new ListingReviewListModel(listing);
    });
};

export { getReviews }