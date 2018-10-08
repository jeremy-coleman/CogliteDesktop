import { concatStyleSets, FontSizes, getTheme, IStyle, ITheme, memoizeFunction } from 'office-ui-fabric-react';

interface IVSplitStyles {
    root?: IStyle;
    splitter?: IStyle;
    splitterHandle?: IStyle;
    topPane?: IStyle;
    topContent?: IStyle;
    bottomPane?: IStyle;
    bottomContent?: IStyle;
}

const defaultStyles = (theme : ITheme) : IVSplitStyles => {
    return {
        root: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        splitter: {
            cursor: "ns-resize",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            backgroundColor: theme.palette.themeDark,
            left: 0,
            right: 0
        },
        splitterHandle: {
            position: "absolute",
            top: -2,
            right: 0,
            bottom: -2,
            left: 0,
            overflow: "hidden",
            backgroundColor: "transparent",
            color: theme.palette.themeDark,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            transition: "background-color 0.3s ease",
            selectors: {
                ":hover": {
                    backgroundColor: theme.palette.themeDark,
                    opacity: 0.5,
                },
                ".vsplit-icon": {
                    fontSize: FontSizes.mini,
                    visibility: "hidden",
                    color: theme.palette.white
                },
                "&.active": {
                    backgroundColor: theme.palette.themeDark,
                    opacity: 1.0,
                    selectors: {
                        ".vsplit-icon": {
                            visibility: "visible"
                        }
                    }
                }
            }
        },
        topPane: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            overflow: "hidden"
        },
        topContent: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "auto"
        },
        bottomPane: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            overflow: "hidden"
        },
        bottomContent: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "auto"
        }
    };
};

const StyleConfig = {
    defaultStyles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IVSplitStyles) => {
    return concatStyleSets(StyleConfig.defaultStyles(theme || getTheme()), customStyles);
});

export { IVSplitStyles, getStyles, StyleConfig }