import { concatStyleSets, getTheme, IStyle, ITheme, memoizeFunction } from 'office-ui-fabric-react';

interface IListingBookmarkStyles {
    root?: IStyle;
}

const defaultStyles = (theme : ITheme) : IListingBookmarkStyles => {
    return {
        root: {
            display: "flex",
            flexWrap: "wrap"
        }
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IListingBookmarkStyles) : IListingBookmarkStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { getStyles, Defaults, defaultStyles, IListingBookmarkStyles }