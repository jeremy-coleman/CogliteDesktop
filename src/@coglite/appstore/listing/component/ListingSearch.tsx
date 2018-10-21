import { SyncComponent } from '@coglite/apphost';
import { observer } from 'mobx-react';
import { MessageBar, MessageBarType, SearchBox } from 'office-ui-fabric-react';
import * as React from 'react';
import { stylesheet } from 'typestyle';

import { ListingViewConfig } from '../constants';
import { IListing, IListingSearchModel } from '../types';
import { ListingList } from './ListingList';
import { ListingTile } from './ListingTile';



let listingSearchStyles = stylesheet({
        root: {},
        input: {
            paddingTop: 8,
            paddingBottom: 0,
            paddingLeft: 16,
            paddingRight: 16
        },
        results: {
        }
})

interface IListingSearchProps {
    search: IListingSearchModel;
    className?: string;
    onLaunch?: (listing : IListing) => void;
    onSelectItem?: (listing : IListing) => void;
}

@observer
class ListingSearchInput extends React.Component<IListingSearchProps, any> {
    private _onSearchChange = (newValue : any) => {
        this.props.search.setSearch(newValue);
    } 
    render() {
        return (
            <div className={listingSearchStyles.input}>
                <SearchBox value={this.props.search.search} placeholder={`Search ${ListingViewConfig.storeLabel}`} onChange={this._onSearchChange} />
            </div>
        );
    }
}

@observer
class ListingSearchResults extends React.Component<IListingSearchProps, any> {
    private _onRenderItem = (listing, idx, props) => {
        return <ListingTile key={listing.id}
                                      listing={listing}
                                      onClick={props.onSelectItem}
                                      onLaunch={this.props.onLaunch} />;
    }
    private _onRenderDone = () => {
        if(this.props.search.itemsView && this.props.search.itemsView.length > 0) {
            return <ListingList listings={this.props.search.itemsView} compact wrapping onSelectItem={this.props.onSelectItem} onRenderListing={this._onRenderItem} />;
        }
        return <MessageBar messageBarType={MessageBarType.info}>No matching {ListingViewConfig.labelPlural} found</MessageBar>;
    }
    render() {
        return (
            <div className={listingSearchStyles.results}>
                <SyncComponent sync={this.props.search.sync} onRenderDone={this._onRenderDone} syncLabel={this.props.search.search ? `Searching ${ListingViewConfig.labelPlural}...` : `Loading ${ListingViewConfig.labelPlural}...`} />
            </div>
        );
    }
}

class ListingSearch extends React.Component<IListingSearchProps, any> {
    componentWillMount() {
        this.props.search.load();
    }
    render() {
        return (
            <div className={listingSearchStyles.root}>
                <ListingSearchInput {...this.props} />
                <ListingSearchResults {...this.props} />
            </div>
        );
    }
}

export { ListingSearch, IListingSearchProps }