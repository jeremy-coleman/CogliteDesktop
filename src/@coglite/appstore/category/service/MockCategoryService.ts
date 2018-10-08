import { ICategoryService, ICategoryGetRequest, ICategoryListRequest } from "./ICategoryService";
import { ICategory } from "../ICategory";
import { SequenceId } from "@coglite/apphost";

const mockIdSequence = new SequenceId();

const nextId = () => {
    return parseInt(mockIdSequence.next());
};

class MockCategoryService implements ICategoryService {
    private _categories : ICategory[] = [];
    get categories() {
        return [].concat(this._categories);
    }
    set categories(value) {
        this._categories = value || [];
    }
    constructor() {
        this._categories.push({
            id: nextId(),
            title: "Sport",
            description: "Sport"
        });
        this._categories.push({
            id: nextId(),
            title: "Food",
            description: "Food"
        });
        this._categories.push({
            id: nextId(),
            title: "Movies",
            description: "Movies"
        });
    }
    getCategory(request: ICategoryGetRequest) : Promise<ICategory> {
        const f = this._categories.find(c => String(c.id) === String(request.categoryId));
        if(f) {
            return Promise.resolve(f);
        }
        return Promise.reject({ code: "NOT_FOUND", message: "Category not found" });
    }
    getCategories(request?: ICategoryListRequest) : Promise<ICategory[]> {
        return Promise.resolve(this.categories);
    }
    saveCategory(category : ICategory) : Promise<ICategory> {
        if(category.id) {
            const idx = this._categories.findIndex(c => c.id === category.id);
            if(idx >= 0) {
                const u = Object.assign({}, this._categories[idx], category);
                this._categories[idx] = u;
                return Promise.resolve(Object.assign({}, u));
            }
            return Promise.reject({ code: "NOT_FOUND", message: "Category not found" });
        }
        const u = Object.assign({}, category, { id: nextId() });
        this._categories.push(u);
        return Promise.resolve(Object.assign({}, u));
    }
    deleteCategory(category : ICategory) : Promise<any> {
        const idx = this._categories.findIndex(c => c.id === category.id);
        if(idx >= 0) {
            this._categories.splice(idx, 1);
            return Promise.resolve();
        }
        return Promise.reject({ code: "NOT_FOUND" });
    }
}

export { MockCategoryService }