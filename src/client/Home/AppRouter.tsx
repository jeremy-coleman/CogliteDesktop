import { exactPath, IRouterManager, Router } from '@coglite/router';
import * as React from 'react';

import { appRoutes, IAppRoute } from './AppRoutes';
import { homeAppHandler } from './HomeHostAppView';


const registerAppRouter = (appRoute : IAppRoute, router : IRouterManager) => {
    if(appRoute.path && appRoute.moduleLoader) {
        console.log("-- Registering homeApp: " + appRoute.key);
        router.use(appRoute.path, exactPath(homeAppHandler(appRoute)));
    }

    if(appRoute.items) {
        appRoute.items.forEach(item => {
            registerAppRouter(item, router);
        });
    }  
};


const createAppRouter = (): Router => {
    const r = new Router();
    
    r.use("/home", exactPath(req => {
        return import("./Home").then(m => {
            return <m.Home host={req.app} />;
        });
    }));

    appRoutes.forEach(appRoute => {
        registerAppRouter(appRoute, r);
    });
    
    //import {HelpRouter} from './dev-sample-apps/help/HelpRouter'
    //r.use(HelpRouter);

    return r;
};


export { createAppRouter }