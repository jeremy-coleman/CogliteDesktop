export interface IError {
    key?: string;
    keyTitle?: string;
    code?: string;
    message: string;
    [key: string] : any;
}

