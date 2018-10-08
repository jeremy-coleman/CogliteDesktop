import { concatStyleSets, FontSizes, FontWeights, getTheme, IStyle, ITheme, memoizeFunction } from 'office-ui-fabric-react';

interface IListingBookmarkTileStyles {
    root?: IStyle;
    header?: IStyle;
    headerActions?: IStyle;
    icon?: IStyle;
    title?: IStyle;
    banner?: IStyle;
    removeAction?: IStyle;
}

const defaultStyles = (theme : ITheme) : IListingBookmarkTileStyles => {
    return {
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
            selectors: {
                ":hover": {
                    border: `1px solid ${theme.palette.orange}`,
                    boxShadow: "0 5px 30px rgba(0, 0, 0, 0.15)",
                    selectors: {
                        "$header": {
                            backgroundColor: theme.palette.orange
                        }
                    }
                },
                ":focus": {
                    border: `1px solid ${theme.palette.orange}`,
                    boxShadow: "0 5px 30px rgba(0, 0, 0, 0.15)",
                    selectors: {
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
            selectors: {
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
            fontWeight: FontWeights.regular,
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
            selectors: {
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
            selectors: {
                ":hover": {
                    backgroundColor: theme.palette.redDark,
                    color: theme.palette.white
                }
            }
        }
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IListingBookmarkTileStyles | undefined) : IListingBookmarkTileStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { IListingBookmarkTileStyles, getStyles, defaultStyles, Defaults }

