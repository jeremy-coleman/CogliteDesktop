import { CategoryServiceContext ,
 MockCategoryService ,
 IListing,
 ListingApprovalStatus,
 ListingServiceContext,
    MockListingService,
    nextListingBookmarkid,
    nextListingId,

ImageServiceContext ,
 MockImageService,
 MockUserDataService,
 MockUserService,
 UserDataServiceContext,
 UserServiceContext ,
 UserAdminContext ,
 isMemberOfGroup } from '@coglite/appstore'
 import {LoggingStorageService ,
 TransientStorageService,
 StorageServiceContext } from '@coglite/apphost';

import { DashboardStorageServiceContext } from '../services/DashboardStorageServiceContext';
import UserGroup from '../user/UserGroup';

//@ts-ignore
import entitySearchImage from './entitysearch.png';


const configure = (env : any) => {
    console.log("-- Applying Mock Configuration");
    const storageService = new LoggingStorageService({
        prefix: "mock",
        target: new TransientStorageService()
    });

    // common config
    StorageServiceContext.value = storageService;

    // bored config 
    DashboardStorageServiceContext.value = storageService;
    
    // ozone config
    // admin context
    UserAdminContext.value = userProfile => {
        return isMemberOfGroup(userProfile, UserGroup.ADMIN);
    };

    const userService = new MockUserService();
    userService.userProfile = {
        id: 1,
        display_name: "Mock User",
        bio: "Mock User Bio",
        user: {
            username: "mock",
            email: "mock@coglite.com",
            groups: [
                {
                    name: "USER"
                },
                {
                    name: "APPS_MALL_STEWARD"
                },
                {
                    name: "Retail Taxonomy"
                },
                {
                    name: "Healthcare Group"
                },
                {
                    name: "Market Risk User"
                }
            ]
        }
    }
    UserServiceContext.value = userService;
    UserDataServiceContext.value = new MockUserDataService();
    const listingService = new MockListingService();
    const listings : IListing[] = [
        {
            id: nextListingId(),
            unique_name: "entity.search.new",
            title: "Entity Search (NEW)",
            description: "Entity Search (NEW)",
            description_short: "Entity Search (NEW)",
            launch_url: "/entity/search/new",
            security_marking: "coglite_entity_search",
            approval_status: ListingApprovalStatus.APPROVED,
            is_enabled: true,
            iframe_compatible: true,
            small_icon: {
                url: entitySearchImage
            },
            large_icon: {
                url: entitySearchImage
            },
            banner_icon: {
                url: entitySearchImage
            }
        },
        {
            id: nextListingId(),
            unique_name: "entity.search",
            title: "Entity Search",
            description: "Entity Search",
            description_short: "Entity Search",
            launch_url: "/entity/search",
            security_marking: "coglite_entity_search",
            approval_status: ListingApprovalStatus.APPROVED,
            is_enabled: true,
            iframe_compatible: true
        },
        {
            id: nextListingId(),
            unique_name: "entity.profile",
            title: "Clipboard",
            description: "Clipboard",
            description_short: "Clipboard",
            launch_url: "/entity/profile",
            security_marking: "analyst_desktop_entity_search",
            approval_status: ListingApprovalStatus.APPROVED,
            is_enabled: true
        },
        {
            id: nextListingId(),
            unique_name: "google",
            title: "Google",
            description: "Google",
            description_short: "Google",
            launch_url: "http://www.google.com",
            security_marking: "USER",
            approval_status: ListingApprovalStatus.APPROVED,
            is_enabled: true,
            iframe_compatible: false
        },
        {
            id: nextListingId(),
            unique_name: "Microsoft",
            title: "Microsoft",
            description: "Microsoft",
            description_short: "Microsoft",
            launch_url: "http://www.microsoft.com",
            security_marking: "USER",
            approval_status: ListingApprovalStatus.APPROVED,
            is_enabled: false,
            iframe_compatible: false
        },
        {
            id: nextListingId(),
            unique_name: "mesh.producer",
            title: "Mesh Producer",
            description: "Mesh Producer",
            description_short: "Mesh Producer",
            launch_url: "http://localhost:8080/mesh/sample/producer",
            security_marking: "USER",
            approval_status: ListingApprovalStatus.APPROVED,
            is_enabled: true,
            iframe_compatible: true
        },
        {
            id: nextListingId(),
            unique_name: "mesh.consumer",
            title: "Mesh Consumer",
            description: "Mesh Consumer",
            description_short: "Mesh Consumer",
            launch_url: "http://localhost:8080/mesh/sample/consumer",
            security_marking: "USER",
            approval_status: ListingApprovalStatus.APPROVED,
            is_enabled: true,
            iframe_compatible: true
        },
        {
            id: nextListingId(),
            unique_name: "mesh.embedded",
            title: "Mesh Embedded",
            description: "Mesh Embedded",
            description_short: "Mesh Embedded",
            launch_url: "/mesh/sample/embedded",
            security_marking: "USER",
            approval_status: ListingApprovalStatus.APPROVED,
            is_enabled: true,
            iframe_compatible: true
        }
    ];
    const bookmarks = listings.map(l => {
        return {
            id: nextListingBookmarkid(),
            listing: l
        };
    });
    listingService.listings = listings;
    listingService.bookmarks = bookmarks;
    ListingServiceContext.value = listingService;
    ImageServiceContext.value = new MockImageService();
    CategoryServiceContext.value = new MockCategoryService();
    
};

export { configure, configure as default };