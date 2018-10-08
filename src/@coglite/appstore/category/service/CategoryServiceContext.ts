import { Context } from "@coglite/apphost";
import { ICategoryService } from "./ICategoryService";

const CategoryServiceContext = new Context<ICategoryService>();

export { CategoryServiceContext }