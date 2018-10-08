import { concatStyleSets, getTheme, IStyle, ITheme, memoizeFunction } from 'office-ui-fabric-react';

interface IFileFieldStyles {
    root?: IStyle;
    wrapper?: IStyle;
    selector?: IStyle;
    selectorAction?: IStyle;
    clearAction?: IStyle;
}

const defaultStyles = (theme : ITheme) : IFileFieldStyles => {
    return {
        root: {
            
        },
        wrapper: {
            
        },
        selector: {
            position: "relative",
            border: `1px solid ${theme.palette.neutralTertiary}`,
            minHeight: 32,
            width: "100%",
            selectors: {
                "&:focus": {
                    border: `1px solid ${theme.palette.themePrimary}`
                },
                "&:hover": {
                    border: `1px solid ${theme.palette.neutralSecondary}`
                }
            }
        },
        selectorAction: {
            background: theme.palette.white,
            outline: "none",
            textAlign: "left",
            padding: "4px 12px",
            border: "none",
            minHeight: 32,
            width: "100%",
            zIndex: 1
        },
        clearAction: {
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 2
        }
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IFileFieldStyles | undefined) : IFileFieldStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { IFileFieldStyles, getStyles, defaultStyles, Defaults }

