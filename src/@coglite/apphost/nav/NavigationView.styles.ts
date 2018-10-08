import { concatStyleSets, getTheme, IStyle, ITheme, memoizeFunction } from 'office-ui-fabric-react';

interface INavigationViewStyles {
    root?: IStyle;
    title?: IStyle;
    menu?: IStyle;
    menuGlass?: IStyle;
    menuContent?: IStyle;
    menuControl?: IStyle;
    menuContentNear?: IStyle;
    menuContentFar?: IStyle;
    menuItemContainer?: IStyle;
    menuItem?: IStyle;
    menuItemTitleContainer?: IStyle;
    menuItemIconContainer?: IStyle;
    menuItemIconAlt?: IStyle;
    main?: IStyle;
}

const defaultStyles = (theme : ITheme) : INavigationViewStyles => {
    return {
        root: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        menu: {
            zIndex: 2,
            width: 40,
            left: 0,
            top: 0,
            bottom: 0,
            position: "absolute",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            transition: "width 0.2s",
            backgroundColor: theme.palette.neutralDark,
            selectors: {
                "&.open": {
                    width: 200,
                    backgroundColor: theme.palette.neutralDark,
                    boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.4)"
                },
                "&.inline": {
                    boxShadow: "none"
                }
            }
        },
        menuGlass: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 1,
            background: "transparent"
        },
        menuContent: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 2,
            background: "transparent"
        },
        menuContentNear: {
            position: "absolute",
            top: 40,
            left: 0,
            right: 0
        },
        menuContentFar: {
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center"
        },
        menuItemContainer: {

        },
        menuItem: {
            outline: "none",
            border: "none",
            padding: 0,
            margin: 0,
            background: "transparent",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            minHeight: 40,
            width: "100%",
            overflow: "hidden",
            color: theme.palette.white,
            cursor: "pointer",
            selectors: {
                ":hover": {
                    backgroundColor: theme.palette.neutralPrimary
                },
                "&.active": {
                    backgroundColor: theme.palette.neutralPrimary
                }
            }
        },
        menuItemTitleContainer: {
            overflow: "hidden",
            whiteSpace: "nowrap"
        },
        menuItemIconContainer: {
            width: 40,
            minWidth: 40,
            height: 40,
            minHeight: 40,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        menuItemIconAlt: Object.assign({}, theme.fonts.tiny),
        main: {
            zIndex: 1,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: "auto",
            transition: "left 0.2s",
            selectors: {
                "&.hasMenu": {
                    left: 40
                },
                "&.menuInlineOffset": {
                    left: 200
                }
            }
        }
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: INavigationViewStyles) => {
    return concatStyleSets(Defaults.styles(theme || getTheme()), customStyles);
});

export { INavigationViewStyles, getStyles, Defaults, defaultStyles }