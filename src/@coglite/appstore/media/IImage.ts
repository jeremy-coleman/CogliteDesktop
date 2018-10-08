interface IImage {
    id?: number;
    url?: string;
    security_marking?: string;
    image_type?: string;
    [key : string] : any;
}

export { IImage }