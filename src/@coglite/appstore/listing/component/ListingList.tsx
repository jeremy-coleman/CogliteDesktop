import { SyncComponent } from '@coglite/apphost';
import * as React from 'react';

import { IListing } from '../IListing';
import { IListingListModel } from '../model/IListingListModel';
import { getClassNames } from './ListingList.classNames';
import { getStyles, IListingListStyles } from './ListingList.styles';
import { ListingTile } from './ListingTile';

interface IListingListProps {
    listings: IListing[];
    compact?: boolean;
    wrapping?: boolean;
    onRenderListing?: (listing : IListing, index?: number, props?: IListingListProps) => React.ReactNode;
    onSelectItem?: (item : IListing) => void;
    className?: string;
    styles?: IListingListStyles;
    onRenderEmpty?: () => React.ReactNode;
}

const defaultListingRenderer = (listing : IListing, index : number, props : IListingListProps) => {
    return <ListingTile key={listing.id} listing={listing} onClick={props.onSelectItem} />;
};

class ListingList extends React.Component<IListingListProps, any> {
    private _onRenderListing = (listing : IListing, index : number) => {
        const r = this.props.onRenderListing || defaultListingRenderer;
        return r(listing, index, this.props);
    }
    render() {
        if(this.props.listings && this.props.listings.length > 0) {
            const classNames = getClassNames(getStyles(undefined, this.props.styles), this.props.className, this.props.compact, this.props.wrapping);
            const items = this.props.listings.map(this._onRenderListing);
            return (
                <div className={classNames.root}>
                    {items}
                </div>
            );
        }
        return this.props.onRenderEmpty ? this.props.onRenderEmpty() : null;
    }
}

interface IListingListContainerProps {
    listings: IListingListModel;
    compact?: boolean;
    wrapping?: boolean;
    onRenderListing?: (listing : IListing, index?: number, props?: IListingListProps) => React.ReactNode;
    onSelectItem?: (item : IListing) => void;
}

class ListingListContainer extends React.Component<IListingListContainerProps, any> {
    componentWillMount() {
        this.props.listings.load();
    }
    private _onRenderDone = () => {
        return <ListingList listings={this.props.listings.itemsView}
                            onSelectItem={this.props.onSelectItem}
                            onRenderListing={this.props.onRenderListing}
                            compact={this.props.compact}
                            wrapping={this.props.wrapping} />;
    }
    render() {
        return <SyncComponent sync={this.props.listings.sync} onRenderDone={this._onRenderDone} syncLabel="Loading Listings..." />
    }
}

export {
    IListingListProps,
    IListingListContainerProps,
    ListingListContainer,
    ListingList
}