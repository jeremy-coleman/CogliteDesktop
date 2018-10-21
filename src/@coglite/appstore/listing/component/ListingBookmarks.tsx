import { IConsumerFunc, SyncComponent } from '@coglite/apphost';
import Snackbar from '@material-ui/core/Snackbar';
import { observer } from 'mobx-react';
import * as React from 'react';

import { IListingBookmark, IListingBookmarkListModel } from '../types';
import { ListingBookmarkTile } from './ListingBookmarkTile';

interface IListingBookmarksProps {
    bookmarkList: IListingBookmarkListModel;
    onLaunch?: IConsumerFunc<IListingBookmark>;
    onRenderNoBookmarks?: () => React.ReactNode;
    className?: string;
}


@observer
class ListingBookmarks extends React.Component<IListingBookmarksProps, any> {
    private _onRemoveBookmark = (bookmark) => {
        this.props.bookmarkList.removeBookmark(bookmark.listing);
    }
    private _onRenderBookmark = (bookmark : IListingBookmark) => {
        return <ListingBookmarkTile key={bookmark.id}
                                    bookmark={bookmark}
                                    onLaunch={this.props.onLaunch}
                                    onRemove={this._onRemoveBookmark} />;
    }
    render() {
        if(this.props.bookmarkList.value && this.props.bookmarkList.value.length > 0) {
            return (
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    {this.props.bookmarkList.value.map(this._onRenderBookmark)}
                </div>
            );
        }
        return this.props.onRenderNoBookmarks ? this.props.onRenderNoBookmarks() :
            (
                <Snackbar open={this.props.onRenderNoBookmarks ? true : false} autoHideDuration={1000}>
                    You haven't bookmarked anything.
                </Snackbar>
            );
    }
}

class ListingBookmarksContainer extends React.Component<IListingBookmarksProps, any> {
    componentWillMount() {
        this.props.bookmarkList.load();
    }
    private _onRenderDone = () => {
        return <ListingBookmarks {...this.props} />;
    }
    render() {
        return <SyncComponent sync={this.props.bookmarkList.sync} onRenderDone={this._onRenderDone} />
    }
}

export {
    IListingBookmarksProps,
    ListingBookmarks,
    ListingBookmarksContainer
}