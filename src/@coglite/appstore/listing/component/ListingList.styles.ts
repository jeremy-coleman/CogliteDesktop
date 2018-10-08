import { concatStyleSets, getTheme, IStyle, ITheme, memoizeFunction } from 'office-ui-fabric-react';

interface IListingListStyles {
    root?: IStyle;
    compactRoot?: IStyle;
    wrappingRoot?: IStyle;
}

const defaultStyles = (theme : ITheme) : IListingListStyles => {
    return {
        root: {
            
        },
        compactRoot: {
            display: "flex",
            alignItems: "center"
        },
        wrappingRoot: {
            flexWrap: "wrap"
        }
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IListingListStyles | undefined) : IListingListStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { IListingListStyles, getStyles }