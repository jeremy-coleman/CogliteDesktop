import { concatStyleSets, getTheme, IStyle, ITheme, memoizeFunction } from 'office-ui-fabric-react';

interface IListingSearchStyles {
    root?: IStyle;
    input?: IStyle;
    results?: IStyle;
}

const defaultStyles = (theme : ITheme) : IListingSearchStyles => {
    return {
        root: {},
        input: {
            paddingTop: 8,
            paddingBottom: 0,
            paddingLeft: 16,
            paddingRight: 16
        },
        results: {
        }
    }
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IListingSearchStyles) : IListingSearchStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { IListingSearchStyles, getStyles, defaultStyles, Defaults }