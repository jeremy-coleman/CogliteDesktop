import { concatStyleSets, FontSizes, getTheme, IStyle, ITheme, memoizeFunction } from 'office-ui-fabric-react';

interface IListingIconTileStyles {
    root?: IStyle;
    top?: IStyle;
    content?: IStyle;
    title?: IStyle;
}

const defaultStyles = (theme : ITheme) : IListingIconTileStyles => {
    return {
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
            selectors: {
                "&:hover": {
                    boxShadow: "0 5px 30px rgba(0, 0, 0, 0.15)",
                    selectors: {
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
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IListingIconTileStyles) : IListingIconTileStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export {
    IListingIconTileStyles,
    defaultStyles,
    Defaults,
    getStyles
}