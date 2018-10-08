import { IListingReview } from "../IListingReview";
import { IListingReviewModel } from "./IListingReviewModel";
import { IListingRelatedListModel } from "./IListingRelatedListModel";

interface IListingReviewListModel extends IListingRelatedListModel<IListingReview> {
    newReview : IListingReviewModel;
    add() : void;
    cancelEdit() : void;
}

export { IListingReviewListModel };