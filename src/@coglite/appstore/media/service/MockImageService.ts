import { IGetImagesRequest, IImage, IImageService } from '../types';

class MockImageService implements IImageService {
    private _images : IImage[] = [];
    getImageUrl(request : IImage) : string {
        return `/mock/image/${request.id}/`;
    }
    getImages(request : IGetImagesRequest) : Promise<IImage[]> {
        return Promise.resolve(this._images.map(img => Object.assign({}, img)));
    }
    saveImage(request : IImage) : Promise<IImage> {
        const idx = this._images.findIndex(img => img.id === request.id);
        let savedImage;
        if(idx >= 0) {
            savedImage = Object.assign({}, this._images[idx], request);
            this._images[idx] = savedImage;
        } else {
            savedImage = Object.assign({}, request);
            this._images.push(savedImage);
        }
        return Object.assign({}, savedImage);
    }
    deleteImage(request : IImage) : Promise<any> {
        const idx = this._images.findIndex(img => img.id === request.id);
        if(idx >= 0) {
            this._images.splice(idx, 1);
        }
        return Promise.resolve();
    }
}

export {
    MockImageService
}