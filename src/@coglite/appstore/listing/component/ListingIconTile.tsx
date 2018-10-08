import { Persona } from 'office-ui-fabric-react';
import * as React from 'react';

import { IListing } from '../IListing';
import { getClassNames, IListingIconTileClassNames } from './ListingIconTile.classNames';
import { getStyles, IListingIconTileStyles } from './ListingIconTile.styles';

enum ListingIconSize {
    small = 16,
    large = 32
}

interface IListingIconTileProps {
    listing: IListing;
    onClick?: (listing : IListing, e : React.MouseEvent<HTMLButtonElement>) => void;
    iconSize?: ListingIconSize,
    styles?: IListingIconTileStyles;
    className?: string;
}

class ListingIconTileIcon extends React.Component<IListingIconTileProps, any> {
    render() {
        const { listing, iconSize } = this.props;
        let iconUrl : string;
        let iconImageSize : ListingIconSize = iconSize || ListingIconSize.large;
        if(iconImageSize === ListingIconSize.small) {
            iconUrl = listing.small_icon ? listing.small_icon.url : undefined;
        } else {
            iconUrl = listing.large_icon ? listing.large_icon.url : undefined;
        }
        return (
            <Persona hidePersonaDetails imageUrl={iconUrl} text={listing.title} />
        );
    }
}

class ListingIconTile extends React.Component<IListingIconTileProps, any> {
    private _classNames : IListingIconTileClassNames;
    private _onClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        this.props.onClick(this.props.listing, e);
    }
    private _onRenderTop = () => {
        return (
            <div className={this._classNames.top}>
                <ListingIconTileIcon {...this.props} />
            </div>
        );
    }
    private _onRenderContent = () => {
        return (
            <div className={this._classNames.content}>
                <div className={this._classNames.title}>{this.props.listing.title}</div>
            </div>
        )
    }
    render() {
        const { listing, styles, className, onClick } = this.props;
        this._classNames = getClassNames(getStyles(null, styles), className);
        return (
            <button title={onClick ? `Launch ${listing.title}` : listing.title} type="button" className={this._classNames.root} onClick={onClick ? this._onClick : undefined}>
                {this._onRenderTop()}
                {this._onRenderContent()}
            </button>
        );
    }
}

export { IListingIconTileProps, ListingIconTile, ListingIconSize }