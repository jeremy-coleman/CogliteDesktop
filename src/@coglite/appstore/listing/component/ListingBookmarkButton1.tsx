import CircularProgress from '@material-ui/core/CircularProgress';
//import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import Bookmark from '@material-ui/icons/Bookmark';
import BookmarkOutlined from '@material-ui/icons/BookmarkOutlined';
import { observer } from 'mobx-react';
import * as React from 'react';

import { ListingViewConfig } from '../constants';
import { IListing, IListingBookmarkListModel } from '../types';
import Button from '@material-ui/core/Button';

//import { Spinner, SpinnerSize } from "office-ui-fabric-react";
//import { IButtonProps,IconButton } from "office-ui-fabric-react";

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
        return <CircularProgress size={'16px'} />;
    }
    render() {
        if(ListingViewConfig.bookmarksEnabled) {
            const { listing, bookmarkList } = this.props;
            const sync = bookmarkList.sync;
            const syncing = sync.syncing && (sync.type !== "update" || sync.id === String(listing.id));
            const isBookmarked = bookmarkList.isBookmarked(listing);
            const title = syncing ? "Please wait..." : isBookmarked ? "Bookmarked - Click to Remove" : "Click to Set Bookmark";
            
            // checked: isBookmarked ? true : false,
            // ariaDescription: title,
            //onRenderIcon: syncing ? this._onRenderSyncIcon : undefined
            const props = {
                onClick: this._onClick,
                title: title,
                //color: 'primary',
                disabled: syncing,
            };
            return (
            <Button color='primary' {...props} >
            {isBookmarked ? <Bookmark/> : <BookmarkOutlined/>}
            </Button>)
        }
        return null;
    }
}

export { IListingBookmarkButtonProps, ListingBookmarkButton }