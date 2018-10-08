import { AppstorePaths } from '@coglite/appstore';
import { AppstorePathsContext } from '@coglite/appstore';
import { AppstoreRouter } from '@coglite/appstore';
import { injectUserProfile } from '@coglite/appstore';
import { ConfigRouter, reactRouter, Router } from '@coglite/router';

import * as configMap from './config/map';


const r = new Router();

// these are our 'interceptors'
// common config
r.use((req, next) => {
    return import("./config/common").then(() => {
        next();
    });
});

// config
r.use(new ConfigRouter({
    env: AppConfig,
    configMap: configMap
}));


// app-store user config
r.use(injectUserProfile());

r.use("/about", reactRouter(() => import("./components/About")));
r.use("/help", reactRouter(() => import("./components/Help")));

AppstorePathsContext.value = new AppstorePaths("/appstore");
r.use("/appstore", AppstoreRouter);

// r.use("/search", SearchRouter);
// set paths to match router prefix
r.use("/mesh/sample/producer", reactRouter(() => import("./mesh/sample/producer")));
r.use("/mesh/sample/consumer", reactRouter(() => import("./mesh/sample/consumer")));
r.use("/mesh/sample/embedded", reactRouter(() => import("./mesh/sample/embedded")));
r.use("/mess/axiosTest", reactRouter(() => import("./mess/component/AxiosTestApp")));
r.use("/blank", req => {
    return null;
});



const dashboardRouter = reactRouter(() => import("./components/DashboardsApp"), { exact: false });

r.use((req, next) => {
    if (req.path === "/" || req.path === "/index" || req.path === "/dashboard") {
        return dashboardRouter(req, next);
    }
    return next(req);
});

export { r as default, r as AppRouter }