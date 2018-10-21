import { theme } from '@coglite/apphost';
import Avatar from '@material-ui/core/Avatar';
import { FontSizes } from 'office-ui-fabric-react';
import * as React from 'react';
import { stylesheet } from 'typestyle';

import { IListing } from '../types';




const listingIconTileStyles = stylesheet({
            root: {
            justifyContent: "center",
            padding: 0,
            background: "transparent",
            outline: "none",
            borderRadius: 4,
            cursor: "pointer",
            width: 112,
            maxWidth: 112,
            minWidth: 112,
            backgroundColor: theme.palette.white,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
            transition: "box-shadow 0.5s",
            border: `1px solid ${theme.palette.neutralQuaternary}`,
            $nest: {
                "&:hover": {
                    boxShadow: "0 5px 30px rgba(0, 0, 0, 0.15)",
                    $nest: {
                        "$top": {
                            backgroundColor: theme.palette.neutralQuaternaryAlt
                        }
                    }
                }
            }
        },
        top: {
            height: 60,
            minHeight: 60,
            maxHeight: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.palette.neutralLight
        },
        content: {
            height: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        title: {
            fontSize: FontSizes.small,
            width: 108,
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap"
        }
})


enum ListingIconSize {
    small = 16,
    large = 32
}

interface IListingIconTileProps {
    listing: IListing;
    onClick?: (listing : IListing, e : React.MouseEvent<HTMLButtonElement>) => void;
    iconSize?: ListingIconSize,
    //styles?: IListingIconTileStyles;
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
            <Avatar src={iconUrl}>
            {(listing.title).substring(0,1)}
            </Avatar>
        );
    }
}

class ListingIconTile extends React.Component<IListingIconTileProps, any> {
    //private _classNames : IListingIconTileClassNames;
    private _onClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        this.props.onClick(this.props.listing, e);
    }
    private _onRenderTop = () => {
        return (
            <div className={listingIconTileStyles.top}>
                <ListingIconTileIcon {...this.props} />
            </div>
        );
    }
    private _onRenderContent = () => {
        return (
            <div className={listingIconTileStyles.content}>
                <div className={listingIconTileStyles.title}>{this.props.listing.title}</div>
            </div>
        )
    }
    render() {
        const { listing, onClick } = this.props; // styles, className,
        //this._classNames = getClassNames(getStyles(null, styles), className);
        return (
            <button title={onClick ? `Launch ${listing.title}` : listing.title} type="button" className={listingIconTileStyles.root} onClick={onClick ? this._onClick : undefined}>
                {this._onRenderTop()}
                {this._onRenderContent()}
            </button>
        );
    }
}

export { IListingIconTileProps, ListingIconTile, ListingIconSize }