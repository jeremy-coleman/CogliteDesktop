import { IRequestHandler } from './IRequestHandler';

interface IExactPathOptions {
    allowTrailingSlash?: boolean;
}

const exactPath = (handler : IRequestHandler, opts?: IExactPathOptions) : IRequestHandler => {
    return (req, next) => {
        if(req.basePath === req.path || (opts && opts.allowTrailingSlash && req.path === `${req.basePath}/`)) {
            return handler(req, next);
        }
        next();
    };
};

export { IExactPathOptions, exactPath }