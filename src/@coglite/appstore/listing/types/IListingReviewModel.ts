import { ISyncModel } from '@coglite/apphost';

import { IListingReview } from './IListingReview';

interface IListingReviewModel extends IListingReview {
    sync : ISyncModel;
    setText(text : string) : void;
    setRate(rate : number) : void;
    save() : Promise<any>;
}

export { IListingReviewModel }