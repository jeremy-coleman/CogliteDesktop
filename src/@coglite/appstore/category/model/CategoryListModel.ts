import { ListModel } from "@coglite/apphost";
import { ICategory } from "../ICategory";
import { ICategoryService } from "../service/ICategoryService";
import { CategoryServiceContext } from "../service/CategoryServiceContext";

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