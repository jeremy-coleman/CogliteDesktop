import { observer } from 'mobx-react';
import { SearchBox } from 'office-ui-fabric-react';
import * as React from 'react';
import { stylesheet } from 'typestyle';

import { ListingViewConfig } from '../constants';
import { IListing } from '../types';
import { IListingListContainerProps, ListingListContainer } from './ListingList';
import { ListingTile } from './ListingTile';



const listingListPageStyles = stylesheet({
        root: {},
        input: {
            paddingTop: 8,
            paddingBottom: 0,
            paddingLeft: 16,
            paddingRight: 16
        },
        results: {}

})

interface IListingListPageProps extends IListingListContainerProps {
    //styles?: IListingListPageStyles;
    className?: string;
    onLaunch?: (listing : IListing) => void;
}

@observer
class ListingListSearchInput extends React.Component<IListingListPageProps, any> {
    private _onSearchChange = (newValue : any) => {
        this.props.listings.setSearchText(newValue);
    } 
    render() {
        //const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className); 
        return (
            <div className={listingListPageStyles.input}>
                <SearchBox value={this.props.listings.searchText} placeholder={`Search ${ListingViewConfig.labelPlural}`} onChange={this._onSearchChange} />
            </div>
        );
    }
}

class ListingListPage extends React.Component<IListingListPageProps, any> {
    private _onRenderItem = (listing, idx, props) => {
        return <ListingTile key={listing.id}
                            listing={listing}
                            onClick={props.onSelectItem}
                            onLaunch={this.props.onLaunch} />;
    }
    render() {
        //const classNames = getClassNames(getStyles(undefined, this.props.styles), this.props.className); 
        return (
            <div className={listingListPageStyles.root}>
                <ListingListSearchInput {...this.props} />
                <div className={listingListPageStyles.results}>
                    <ListingListContainer {...this.props} onRenderListing={this._onRenderItem} />
                </div>
            </div>
        );
    }
}

export { IListingListPageProps, ListingListPage }

