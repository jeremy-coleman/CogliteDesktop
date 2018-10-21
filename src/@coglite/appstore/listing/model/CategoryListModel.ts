import { ListModel } from '@coglite/apphost';

import { CategoryServiceContext } from '../service/CategoryServiceContext';
import { ICategory, ICategoryService } from '../types';

class CategoryListModel extends ListModel<ICategory> {
    private _service : ICategoryService;
    get service() {
        return this._service || CategoryServiceContext.value;
    }
    set service(value) {
        this._service = value;
    }

    protected _loadImpl() {
        return this.service.getCategories();
    }
}

export { CategoryListModel }