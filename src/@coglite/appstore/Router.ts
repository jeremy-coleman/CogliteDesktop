import { Router,exactPath , reactRouter } from "@coglite/router";
import { launchHandler } from "./listing/ListingLaunch";

const r = new Router();
r.use("/bookmarks", reactRouter(() => import("./listing/component/ListingBookmarksApp")));
r.use("/store", reactRouter(() => import("./listing/component/ListingStoreFrontApp")));
r.use("/listings", reactRouter(() => import("./listing/component/ListingListApp")));
r.use("/listings/user", reactRouter(() => import("./listing/component/UserListingsApp")));
r.use("/listings/add", reactRouter(() => import("./listing/component/ListingAddApp")));
r.use("/listings/:listingId", reactRouter(() => import("./listing/component/ListingApp")));
r.use("/listings/:listingId/launch", exactPath(launchHandler));
r.use("/listings/:listingId/edit", reactRouter(() => import("./listing/component/ListingEditApp")));

export { r as AppstoreRouter, r as default }