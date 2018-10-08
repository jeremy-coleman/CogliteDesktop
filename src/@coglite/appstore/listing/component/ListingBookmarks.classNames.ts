import { mergeStyleSets } from "office-ui-fabric-react";
import { memoizeFunction } from "office-ui-fabric-react";
import { IListingBookmarkStyles } from "./ListingBookmarks.styles";

interface IListingBookmarkClassNames {
    root?: string;
}

const getClassNames = memoizeFunction((styles : IListingBookmarkStyles, className?: string) : IListingBookmarkClassNames => {
    return mergeStyleSets({
        root: ["listing-bookmarks", styles.root, className]
    })
});

export { IListingBookmarkClassNames, getClassNames }