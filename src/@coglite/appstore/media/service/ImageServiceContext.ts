import { Context } from "@coglite/apphost";
import { IImageService } from "./IImageService";

const ImageServiceContext = new Context<IImageService>();

export { ImageServiceContext }