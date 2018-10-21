import { observer } from 'mobx-react';
import { IButtonProps, IconButton, Spinner, SpinnerSize } from 'office-ui-fabric-react';
import * as React from 'react';

import { IListing, IListingBookmarkListModel } from '../types';

interface IListingBookmarkButtonProps {
    listing: IListing;
    bookmarkList: IListingBookmarkListModel;
}

@observer
class ListingBookmarkButton extends React.Component<IListingBookmarkButtonProps, any> {
    private _onClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const { listing, bookmarkList } = this.props;
        if(bookmarkList.isBookmarked(listing)) {
            bookmarkList.removeBookmark(listing);
        } else {
            bookmarkList.addBookmark(listing);
        }
    }
    componentWillMount() {
        this.props.bookmarkList.load();
    }
    private _onRenderSyncIcon = () => {
        return <Spinner size={SpinnerSize.small} />;
    }
    render() {
        const { listing, bookmarkList } = this.props;
        
        const sync = bookmarkList.sync;
        const syncing = sync.syncing && (sync.type !== "update" || sync.id === String(listing.id));
        const isBookmarked = bookmarkList.isBookmarked(listing);
        const title = syncing ? "Please wait..." : isBookmarked ? "Bookmarked - Click to Remove" : "Click to Set Bookmark";
        const props : IButtonProps = {
            onClick: this._onClick,
            title: title,
            primary: true,
            checked: isBookmarked ? true : false,
            iconProps: { iconName: isBookmarked ? "SingleBookmarkSolid" : "SingleBookmark" },
            disabled: syncing,
            ariaDescription: title,
            onRenderIcon: syncing ? this._onRenderSyncIcon : undefined
        };
        return <IconButton {...props} />;
    }
}

export { IListingBookmarkButtonProps, ListingBookmarkButton }