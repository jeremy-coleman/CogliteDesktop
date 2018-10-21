import { theme } from '@coglite/apphost';
import * as React from 'react';
import { classes, stylesheet } from 'typestyle';

import { ListingBookmarkListStore } from '../model/ListingBookmarkListStore';
import { IListing } from '../types';
import { ListingBannerIcon } from './ListingBannerIcon';
import { ListingBookmarkButton } from './ListingBookmarkButton';
import { ListingLaunchAction } from './ListingLaunchAction';



//import { FontWeights, FontSizes } from 'office-ui-fabric-react';

const listingTileStyles = stylesheet({
root: {
            position: "relative",
            width: 220,
            minWidth: 220,
            maxWidth: 220,
            marginLeft: 16,
            marginTop: 16,
            marginBottom: 16,
            //bottom background color of the app store listing tile
            backgroundColor: theme.palette.white,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
            transition: "box-shadow 0.5s",
            border: `1px solid ${theme.palette.neutralQuaternary}`,
            borderRadius: 4,

            $nest: {
                "&:hover": {
                    boxShadow: "0 5px 30px rgba(0, 0, 0, 0.15)",
                    $nest: {
                        "$top": {
                            backgroundColor: theme.palette.neutralQuaternaryAlt
                        }
                    }
                },
                "&:focus": {
                    boxShadow: "0 5px 30px rgba(0, 0, 0, 0.15)"
                }
            }
        },
        clickableRoot: {
            cursor: "pointer"
        },
        top: {
            height: 150,
            minHeight: 150,
            transition: "background 0.25s",
            overflow: "hidden",
            backgroundColor: theme.palette.neutralLight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        banner: {
            
        },
        content: {
            position: "relative",
            height: 100,
            minHeight: 100,
            color: theme.palette.neutralPrimary,
            fontSize: '14px'
        },
        actions: {
            position: "absolute",
            right: 0,
            top: 0,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end"
        },
        title: {
            fontWeight: 600,
            fontSize: '14px',
            paddingTop: 12,
            paddingRight: 10,
            paddingBottom: 6,
            paddingLeft: 10,
            marginTop: 0,
            marginBottom: 0
        },
        shortDescription: {
            fontWeight: 300,
            overflow: "hidden",
            textOverflow: "clip",
            maxHeight: 60,
            paddingTop: 0,
            paddingRight: 10,
            paddingBottom: 2,
            paddingLeft: 10,
            marginTop: 0,
            marginBottom: 0
        }
})


interface IListingTileProps {
    listing: IListing;
    onClick?: (listing : IListing) => void;
    className?: string;
    //styles?: IListingTileStyles;
    onLaunch?: (listing : IListing) => void;
}

class ListingTile extends React.Component<IListingTileProps, any> {
    //private _classNames : IListingTileClassNames;
    private _onClick = () => {
        this.props.onClick(this.props.listing);
    }
    private _renderBanner() : React.ReactNode {
        return (
            <div className={listingTileStyles.banner}>
                <ListingBannerIcon listing={this.props.listing} />
            </div>
        );
    }
    private _renderTop() : React.ReactNode {
        return (
            <div className={listingTileStyles.top}>
                {this._renderBanner()}
            </div>
        );
    }
    private _renderTitle() : React.ReactNode {
        return (
            <h3 className={listingTileStyles.title}>
                {this.props.listing.title}
            </h3>
        )
    }
    private _renderShortDescription() : React.ReactNode {
        return (
            <h5 className={listingTileStyles.shortDescription}>
                {this.props.listing.description_short}
            </h5>
        )
    }
    private _renderActions() : React.ReactNode {
        return (
            <div className={listingTileStyles.actions}>
                <ListingBookmarkButton bookmarkList={ListingBookmarkListStore} listing={this.props.listing} />
                <ListingLaunchAction {...this.props} />
            </div>
        );
    }
    private _renderContent() : React.ReactNode {
        return (
            <div className={listingTileStyles.content}>
                {this._renderActions()}
                {this._renderTitle()}
                {this._renderShortDescription()}
            </div>
        );
    }
    render() {
       // this._classNames = getClassNames(getStyles(null, this.props.styles), this.props.className, this.props.onClick ? true : false);
        return (
            <div className={classes(listingTileStyles.root, listingTileStyles.clickableRoot)}
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