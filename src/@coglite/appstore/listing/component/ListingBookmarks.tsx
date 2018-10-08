import { IConsumerFunc, SyncComponent } from '@coglite/apphost';
import { observer } from 'mobx-react';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react';
import * as React from 'react';

import { IListingBookmark } from '../IListingBookmark';
import { IListingBookmarkListModel } from '../model/IListingBookmarkListModel';
import { getClassNames } from './ListingBookmarks.classNames';
import { getStyles, IListingBookmarkStyles } from './ListingBookmarks.styles';
import { ListingBookmarkTile } from './ListingBookmarkTile';

interface IListingBookmarksProps {
    bookmarkList: IListingBookmarkListModel;
    onLaunch?: IConsumerFunc<IListingBookmark>;
    onRenderNoBookmarks?: () => React.ReactNode;
    styles?: IListingBookmarkStyles;
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
            const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
            return (
                <div className={classNames.root}>
                    {this.props.bookmarkList.value.map(this._onRenderBookmark)}
                </div>
            );
        }
        return this.props.onRenderNoBookmarks ? this.props.onRenderNoBookmarks() :
            (
                <MessageBar messageBarType={MessageBarType.warning}>
                    You haven't bookmarked anything.
                </MessageBar>
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