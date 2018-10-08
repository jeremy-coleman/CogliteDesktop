import { observer } from 'mobx-react';
import { SearchBox } from 'office-ui-fabric-react';
import * as React from 'react';

import { IListing } from '../IListing';
import { IListingListContainerProps, ListingListContainer } from './ListingList';
import { getClassNames } from './ListingListPage.classNames';
import { getStyles, IListingListPageStyles } from './ListingListPage.styles';
import { ListingTile } from './ListingTile';
import { ListingViewConfig } from './ListingViewConfig';

interface IListingListPageProps extends IListingListContainerProps {
    styles?: IListingListPageStyles;
    className?: string;
    onLaunch?: (listing : IListing) => void;
}

@observer
class ListingListSearchInput extends React.Component<IListingListPageProps, any> {
    private _onSearchChange = (newValue : any) => {
        this.props.listings.setSearchText(newValue);
    } 
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className); 
        return (
            <div className={classNames.input}>
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
        const classNames = getClassNames(getStyles(undefined, this.props.styles), this.props.className); 
        return (
            <div className={classNames.root}>
                <ListingListSearchInput {...this.props} />
                <div className={classNames.results}>
                    <ListingListContainer {...this.props} onRenderListing={this._onRenderItem} />
                </div>
            </div>
        );
    }
}

export { IListingListPageProps, ListingListPage }

