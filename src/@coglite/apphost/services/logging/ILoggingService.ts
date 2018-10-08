interface ILoggingService {
    info(message : any, ...optionalParams : any[]) : void;
    warn(message : any, ...optionalParams : any[]) : void;
    error(message : any, ...optionalParams : any[]) : void;
}

export { ILoggingService }