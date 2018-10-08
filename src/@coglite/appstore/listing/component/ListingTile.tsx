import * as React from 'react';

import { IListing } from '../IListing';
import { ListingBookmarkListStore } from '../model/ListingBookmarkListStore';
import { ListingBannerIcon } from './ListingBannerIcon';
import { ListingBookmarkButton } from './ListingBookmarkButton';
import { ListingLaunchAction } from './ListingLaunchAction';
import { getClassNames, IListingTileClassNames } from './ListingTile.classNames';
import { getStyles, IListingTileStyles } from './ListingTile.styles';

interface IListingTileProps {
    listing: IListing;
    onClick?: (listing : IListing) => void;
    className?: string;
    styles?: IListingTileStyles;
    onLaunch?: (listing : IListing) => void;
}

class ListingTile extends React.Component<IListingTileProps, any> {
    private _classNames : IListingTileClassNames;
    private _onClick = () => {
        this.props.onClick(this.props.listing);
    }
    private _renderBanner() : React.ReactNode {
        return (
            <div className={this._classNames.banner}>
                <ListingBannerIcon listing={this.props.listing} />
            </div>
        );
    }
    private _renderTop() : React.ReactNode {
        return (
            <div className={this._classNames.top}>
                {this._renderBanner()}
            </div>
        );
    }
    private _renderTitle() : React.ReactNode {
        return (
            <h3 className={this._classNames.title}>
                {this.props.listing.title}
            </h3>
        )
    }
    private _renderShortDescription() : React.ReactNode {
        return (
            <h5 className={this._classNames.shortDescription}>
                {this.props.listing.description_short}
            </h5>
        )
    }
    private _renderActions() : React.ReactNode {
        return (
            <div className={this._classNames.actions}>
                <ListingBookmarkButton bookmarkList={ListingBookmarkListStore} listing={this.props.listing} />
                <ListingLaunchAction {...this.props} />
            </div>
        );
    }
    private _renderContent() : React.ReactNode {
        return (
            <div className={this._classNames.content}>
                {this._renderActions()}
                {this._renderTitle()}
                {this._renderShortDescription()}
            </div>
        );
    }
    render() {
        this._classNames = getClassNames(getStyles(null, this.props.styles), this.props.className, this.props.onClick ? true : false);
        return (
            <div className={this._classNames.root}
                 role={this.props.onClick ? "button" : undefined}
                 onClick={this.props.onClick ? this._onClick : undefined}
                 title={this.props.listing.title ? `Open ${this.props.listing.title} Details` : "Open Details"}>
                {this._renderTop()}
                {this._renderContent()}
            </div>
        );
    }
}

export { IListingTileProps, ListingTile }