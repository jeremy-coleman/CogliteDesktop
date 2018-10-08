import { IImage } from "../IImage";

interface IGetImagesRequest {
    offset?: number;
    limit?: number;
}

interface IImageService {
    getImageUrl(request : IImage) : string;
    getImages(request : IGetImagesRequest) : Promise<IImage[]>;
    saveImage(request : IImage) : Promise<IImage>;
    deleteImage(request : IImage) : Promise<any>;
}

export { IGetImagesRequest, IImageService }