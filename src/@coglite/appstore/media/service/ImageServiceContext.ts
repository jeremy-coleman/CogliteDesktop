import { Context } from "@coglite/apphost";
import { IImageService } from "../types";

const ImageServiceContext = new Context<IImageService>();

export { ImageServiceContext }