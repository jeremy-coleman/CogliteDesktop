import { IListModel } from '@coglite/apphost';

import { IListingModel } from './IListingModel';

interface IListingRelatedListModel<T> extends IListModel<T> {
    listing : IListingModel;
}

export { IListingRelatedListModel };