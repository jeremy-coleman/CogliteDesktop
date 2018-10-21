import { IImage } from "./IImage";

interface IScreenShot {
    order?: number;
    small_image?: IImage;
    large_image?: IImage;
    description?: string;
}

export { IScreenShot }