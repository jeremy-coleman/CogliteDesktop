interface IListingViewConfig {
    label: string;
    labelPlural: string;
    storeLabel: string;
    bookmarksEnabled?: boolean;
}

const ListingViewConfig : IListingViewConfig = {
    label: "Listing",
    labelPlural: "Listings",
    storeLabel: "Store",
    bookmarksEnabled: false
};

export { ListingViewConfig, IListingViewConfig }