import { concatStyleSets, FontSizes, getTheme, IStyle, ITheme, memoizeFunction } from 'office-ui-fabric-react';

interface IListingPreviewStyles {
    root?: IStyle;
    fallback?: IStyle;
    fallbackIcon?: IStyle;
}

const defaultStyles = (theme : ITheme) : IListingPreviewStyles => {
    return {
        root: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 228,
            height: 145
        },
        fallback: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 220,
            height: 137,
            backgroundColor: theme.palette.neutralLight,
            color: theme.palette.themePrimary
        },
        fallbackIcon: {
            fontSize: FontSizes.xxLarge
        }
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IListingPreviewStyles | undefined) : IListingPreviewStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { IListingPreviewStyles, getStyles, defaultStyles, Defaults }

