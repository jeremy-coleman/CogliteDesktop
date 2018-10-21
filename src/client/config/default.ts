import {
    BrowserStorageService,
    ChainedStorageService,
    LoggingStorageService,
    StorageServiceContext,
    TransientStorageService,
} from '@coglite/apphost';
import {
    CategoryServiceContext,
    ImageServiceContext,
    isMemberOfGroup,
    ListingServiceContext,
    RestCategoryService,
    RestImageService,
    RestListingService,
    RestUserDataService,
    RestUserService,
    UserAdminContext,
    UserDataServiceContext,
    UserDataStorageService,
    UserServiceContext,
} from '@coglite/appstore';
import get from 'get-value';

import { DashboardStorageServiceContext } from '../services/DashboardStorageServiceContext';
import UserGroup from '../user/UserGroup';

const configure = (env : any) => {
    console.log("-- Applying Default Configuration");

    // coglite config

    // admin context
    UserAdminContext.value = userProfile => {
        return isMemberOfGroup(userProfile, UserGroup.ADMIN);
    };

    const apiBaseUrl = get(env, "coglite.api.baseUrl") || "/coglite/api";
    console.log("-- Coglite App Store Api Base Url: " + apiBaseUrl);

    // NOTE that this is for local usage
    let apiAuth;
    const apiUsername = get(env, "coglite.api.username");
    const apiPassword = get(env, "coglite.api.password");
    if(apiUsername && apiPassword) {
        apiAuth = {
            username: apiUsername,
            password: apiPassword
        };
    }
    const cogliteCloudApiBaseUrl = get(env, "coglite.cloud-api.baseUrl") || "/coglite/cloud-api";
    console.log("-- coglite cogliteCloud Api Base Url: " + cogliteCloudApiBaseUrl);

    const userService = new RestUserService();
    userService.baseUrl = apiBaseUrl;
    userService.auth = apiAuth;
    UserServiceContext.value = userService;

    const userDataService = new RestUserDataService();
    userDataService.baseUrl = cogliteCloudApiBaseUrl;
    userDataService.auth = apiAuth;
    UserDataServiceContext.value = userDataService;

    const listingService = new RestListingService();
    listingService.baseUrl = apiBaseUrl;
    listingService.auth = apiAuth;
    ListingServiceContext.value = listingService;

    const imageService = new RestImageService();
    imageService.baseUrl = apiBaseUrl;
    imageService.auth = apiAuth;
    ImageServiceContext.value = imageService;

    const categoryService = new RestCategoryService();
    categoryService.baseUrl = apiBaseUrl;
    categoryService.auth = apiAuth;
    CategoryServiceContext.value = categoryService;

    // global config
    const storageService = new ChainedStorageService([
        new LoggingStorageService({
            target: new BrowserStorageService(localStorage),
            prefix: "localStorage"
        }),
        new LoggingStorageService({
            target: new UserDataStorageService(),
            prefix: "cogliteCloudUserDataStorage"
        })
    ]);
    StorageServiceContext.value = storageService;

    // dashboard config
    const dashboardStorageService = new ChainedStorageService([
        new LoggingStorageService({
            target: new TransientStorageService(),
            prefix: "transientStorage"
        }),
        new LoggingStorageService({
            target: new UserDataStorageService(),
            prefix: "cogliteCloudUserDataStorage"
        })
    ]);
    DashboardStorageServiceContext.value = dashboardStorageService;

    const dsApiBaseUrl = get(env,"ds.api.baseUrl") || "/DataServices";
    console.log("-- Data Services Api Base Url: " + dsApiBaseUrl);

};

export { configure, configure as default };