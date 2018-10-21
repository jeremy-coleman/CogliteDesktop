
interface IValidatable {
    validate?(errorHandler : (error : any) => void) : void;
}

export { IValidatable as default, IValidatable };