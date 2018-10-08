import { css, Icon, Image } from 'office-ui-fabric-react';
import * as React from 'react';

import { IListingBookmark } from '../IListingBookmark';
import { getClassNames, IListingBookmarkTileClassNames } from './ListingBookmarkTile.classNames';
import { getStyles, IListingBookmarkTileStyles } from './ListingBookmarkTile.styles';

interface IListingBookmarkTileProps {
    bookmark: IListingBookmark;
    onLaunch?: (listing : IListingBookmark) => void;
    onRemove?: (listing : IListingBookmark) => void;
    className?: string;
    styles?: IListingBookmarkTileStyles;
}

class ListingBookmarkTile extends React.Component<IListingBookmarkTileProps, any> {
    private _classNames : IListingBookmarkTileClassNames;
    private _onClick = () => {
        this.props.onLaunch(this.props.bookmark);
    }
    private _onClickRemove = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        this.props.onRemove(this.props.bookmark);
    }
    private _renderIcon() : React.ReactNode {
        const { bookmark } = this.props;
        const listingSmallIcon = bookmark.listing.small_icon;
        let image;
        let isIcon = false;
        if(listingSmallIcon && listingSmallIcon.url) {
            image = <Image width={16} height={16} src={listingSmallIcon.url} alt={bookmark.listing.title} />;
        } else {
            isIcon = true;
            image = <Icon iconName="Puzzle" className="thumnail-icon" title={bookmark.listing.title} />
        }
        return (
            <div className={css(this._classNames.icon, { "is-icon": isIcon })}>
                {image}
            </div>
        );
    }
    private _renderTitle() : React.ReactNode {
        return (
            <h5 className={this._classNames.title}>
                {this.props.bookmark.listing.title}
            </h5>
        );
    }
    private _renderRemoveAction() : React.ReactNode {
        if(this.props.onRemove) {
            return (
                <button className={this._classNames.removeAction} onClick={this._onClickRemove} title={`Remove Bookmark: ${this.props.bookmark.listing.title}`}>
                    <Icon iconName="ChromeClose" />
                </button>
            );
        }
        return null;
    }
    private _renderHeaderActions() : React.ReactNode {
        return (
            <div className={this._classNames.headerActions}>
                {this._renderRemoveAction()}
            </div>
        );
    }
    private _renderHeader() : React.ReactNode {
        return (
            <div className={this._classNames.header}>
                {this._renderIcon()}
                {this._renderTitle()} 
                {this._renderHeaderActions()} 
            </div>
        );
    }
    private _renderBanner() : React.ReactNode {
        const listingBannerIcon = this.props.bookmark.listing.banner_icon;
        let banner;
        let bannerIsIcon = false;
        if(listingBannerIcon && listingBannerIcon.url) {
            banner = <Image width={220} height={137} src={listingBannerIcon.url} alt={this.props.bookmark.listing.title} />;
        } else {
            bannerIsIcon = true;
            banner = <Icon iconName="Puzzle" className="banner-icon" title={this.props.bookmark.listing.title} />
        }
        return (
            <div className={css(this._classNames.banner, { "is-icon": bannerIsIcon })}>
                {banner}
            </div>
        );
    }
    render() {
        this._classNames = getClassNames(getStyles(null, this.props.styles), this.props.className, this.props.onLaunch ? true : false);
        return (
            <div className={this._classNames.root}
                 role={this.props.onLaunch ? "button" : undefined}
                 onClick={this.props.onLaunch ? this._onClick : undefined}
                 title={this.props.bookmark.listing.title}>
                {this._renderHeader()}
                {this._renderBanner()}
            </div>
        );
    }
}

export { IListingBookmarkTileProps, ListingBookmarkTile }