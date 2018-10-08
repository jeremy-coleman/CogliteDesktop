import { IRequest, IRouter } from '@coglite/router';


import {IEventEmitter,IStateManager, ISyncModel} from '../types'

interface IAppHost extends IEventEmitter, IStateManager {
    id: string;
    sync: ISyncModel;
    root: boolean;
    title: string;
    iconUrl?: string;
    view: any;
    path: string;
    params: any;
    query: any;
    initialized: boolean;
    router: IRouter;
    canGoBack : boolean;
    backRequest : IRequest;
    back() : void;
    setRouter(router : IRouter) : void;
    setTitle(title : string) : void;
    setIconUrl(iconUrl : string) : void;
    getUrl(request?: IRequest) : string;
    load(request?: IRequest) : Promise<any>;
    getUrl(request: IRequest) : string;
    open(request: IRequest) : Promise<IAppHost>;
    close() : void;
    setRoot(root : boolean) : void;
}

export { IAppHost, IAppHost as default }