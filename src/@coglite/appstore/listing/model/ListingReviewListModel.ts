import { action, observable, computed } from "mobx";
import { IListingReview } from "../IListingReview";
import { IListingReviewListModel } from "./IListingReviewListModel";
import { IListingModel } from "./IListingModel";
import { IListingReviewModel } from "./IListingReviewModel";
import { ListingReviewModel } from "./ListingReviewModel";
import { ListingRelatedListModel } from "./ListingRelatedListModel";

class ListingReviewListModel extends ListingRelatedListModel<IListingReview> implements IListingReviewListModel {
    @observable _newReview : ListingReviewModel;

    constructor(listing : IListingModel) {
        super(listing);
    }

    protected _loadImpl() {
        return this.listingService.getListingReviews({ listingId: this.listing.id });
    }

    @computed
    get newReview() {
        return this._newReview;
    }

    @action
    add() : void {
        this._newReview = new ListingReviewModel(this.listing);
    }

    @action
    cancelEdit() : void {
        this._newReview = undefined;
    }
}

export { ListingReviewListModel }