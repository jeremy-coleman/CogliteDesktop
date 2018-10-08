import { concatStyleSets, FontSizes, FontWeights, getTheme, IStyle, ITheme, memoizeFunction } from 'office-ui-fabric-react';

interface IListingTileStyles {
    root?: IStyle;
    compactRoot?: IStyle;
    clickableRoot?: IStyle;
    top?: IStyle;
    banner?: IStyle;
    content?: IStyle;
    actions?: IStyle;
    title?: IStyle;
    shortDescription?: IStyle;
}

const defaultStyles = (theme : ITheme) : IListingTileStyles => {
    return {
        root: {
            position: "relative",
            width: 220,
            minWidth: 220,
            maxWidth: 220,
            marginLeft: 16,
            marginTop: 16,
            marginBottom: 16,
            backgroundColor: theme.palette.white,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
            transition: "box-shadow 0.5s",
            border: `1px solid ${theme.palette.neutralQuaternary}`,
            borderRadius: 4,
            selectors: {
                "&:hover": {
                    boxShadow: "0 5px 30px rgba(0, 0, 0, 0.15)",
                    selectors: {
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
            fontSize: FontSizes.medium
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
            fontWeight: FontWeights.semibold,
            fontSize: FontSizes.medium,
            paddingTop: 12,
            paddingRight: 10,
            paddingBottom: 6,
            paddingLeft: 10,
            marginTop: 0,
            marginBottom: 0
        },
        shortDescription: {
            fontWeight: FontWeights.semilight,
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
    };
}

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IListingTileStyles | undefined) : IListingTileStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { IListingTileStyles, getStyles, defaultStyles, Defaults }

