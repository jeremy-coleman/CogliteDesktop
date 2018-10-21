import { theme } from '@coglite/apphost';
import { css } from '@coglite/design-system';
import { FontSizes, Icon } from 'office-ui-fabric-react';
import * as React from 'react';
import { stylesheet } from 'typestyle';

import { IListingBookmark } from '../types';


const listingBookmarkTileStyles = stylesheet({
            root: {
            position: "relative",
            width: 220,
            minWidth: 220,
            height: 165,
            minHeight: 165,
            marginLeft: 16,
            marginTop: 16,
            marginBottom: 16,
            backgroundColor: theme.palette.white,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
            transition: "box-shadow 0.5s",
            border: `1px solid ${theme.palette.themeDark}`,
            cursor: "pointer",
            $nest: {
                ":hover": {
                    border: `1px solid ${theme.palette.orange}`,
                    boxShadow: "0 5px 30px rgba(0, 0, 0, 0.15)",
                    $nest: {
                        "$header": {
                            backgroundColor: theme.palette.orange
                        }
                    }
                },
                ":focus": {
                    border: `1px solid ${theme.palette.orange}`,
                    boxShadow: "0 5px 30px rgba(0, 0, 0, 0.15)",
                    $nest: {
                        "$header": {
                            backgroundColor: theme.palette.orange
                        }
                    }
                }
            }
        },
        header: {
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            height: 28,
            overflow: "hidden",
            backgroundColor: theme.palette.themeDark,
            color: theme.palette.white,
            display: "flex",
            alignItems: "center"
        },
        headerActions: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            height: 28,
            background: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end"
        },
        icon: {
            marginLeft: 6,
            marginRight: 6,
            width: 16,
            height: 16,
            zIndex: 2,
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            $nest: {
                "&.is-icon": {
                    backgroundColor: theme.palette.neutralLight,
                    color: theme.palette.orange,
                    fontSize: FontSizes.small
                }
            }
        },
        title: {
            marginTop: 0,
            marginBottom: 0,
            zIndex: 2,
            fontWeight: 400,
            fontSize: FontSizes.small,
        },
        banner: {
            position: "absolute",
            left: 0,
            top: 28,
            width: 220,
            height: 137,
            zIndex: 2,
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            $nest: {
                "&.is-icon": {
                    backgroundColor: theme.palette.neutralLight,
                    color: theme.palette.orange
                },
                ".banner-icon": {
                    fontSize: FontSizes.xxLarge
                }
            }
        },
        removeAction: {
            color: theme.palette.white,
            height: 16,
            width: 16,
            marginLeft: 4,
            marginRight: 4,
            lineHeight: 16,
            zIndex: 2,
            background: "transparent",
            border: "none",
            outline: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: FontSizes.mini,
            $nest: {
                ":hover": {
                    backgroundColor: theme.palette.redDark,
                    color: theme.palette.white
                }
            }
        }
})

interface IListingBookmarkTileProps {
    bookmark: IListingBookmark;
    onLaunch?: (listing : IListingBookmark) => void;
    onRemove?: (listing : IListingBookmark) => void;
    className?: string;
    //styles?: IListingBookmarkTileStyles;
}

class ListingBookmarkTile extends React.Component<IListingBookmarkTileProps, any> {
    //private _classNames : IListingBookmarkTileClassNames;
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
            image = <img width={16} height={16} src={listingSmallIcon.url} alt={bookmark.listing.title} />;
        } else {
            isIcon = true;
            image = <Icon iconName="Puzzle" className="thumnail-icon" title={bookmark.listing.title} />
        }
        return (
            <div className={css(listingBookmarkTileStyles.icon, { "is-icon": isIcon })}>
                {image}
            </div>
        );
    }
    private _renderTitle() : React.ReactNode {
        return (
            <h5 className={listingBookmarkTileStyles.title}>
                {this.props.bookmark.listing.title}
            </h5>
        );
    }
    private _renderRemoveAction() : React.ReactNode {
        if(this.props.onRemove) {
            return (
                <button className={listingBookmarkTileStyles.removeAction} onClick={this._onClickRemove} title={`Remove Bookmark: ${this.props.bookmark.listing.title}`}>
                    <Icon iconName="ChromeClose" />
                </button>
            );
        }
        return null;
    }
    private _renderHeaderActions() : React.ReactNode {
        return (
            <div className={listingBookmarkTileStyles.headerActions}>
                {this._renderRemoveAction()}
            </div>
        );
    }
    private _renderHeader() : React.ReactNode {
        return (
            <div className={listingBookmarkTileStyles.header}>
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
            banner = <img width={220} height={137} src={listingBannerIcon.url} alt={this.props.bookmark.listing.title} />;
        } else {
            bannerIsIcon = true;
            banner = <Icon iconName="Puzzle" className="banner-icon" title={this.props.bookmark.listing.title} />
        }
        return (
            <div className={css(listingBookmarkTileStyles.banner, { "is-icon": bannerIsIcon })}>
                {banner}
            </div>
        );
    }
    render() {
        //listingBookmarkTileStyles = getClassNames(getStyles(null, this.props.styles), this.props.className, this.props.onLaunch ? true : false);
        return (
            <div className={listingBookmarkTileStyles.root}
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