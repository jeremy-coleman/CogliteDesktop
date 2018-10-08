import { ICategory } from "../ICategory";

interface ICategoryGetRequest {
    categoryId: number | string;
}

interface ICategoryListRequest {
    offset?: number;
    limit?: number;
    title?: string;
}

interface ICategoryService {
    getCategory(request: ICategoryGetRequest) : Promise<ICategory>;
    getCategories(request?: ICategoryListRequest) : Promise<ICategory[]>;
    saveCategory(category : ICategory) : Promise<ICategory>;
    deleteCategory(category : ICategory) : Promise<any>;
}

export { ICategoryService, ICategoryGetRequest, ICategoryListRequest }