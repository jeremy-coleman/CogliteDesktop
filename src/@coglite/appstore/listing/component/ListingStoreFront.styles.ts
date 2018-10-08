import { concatStyleSets, FontWeights, getTheme, IStyle, ITheme, memoizeFunction } from 'office-ui-fabric-react';

interface IListingStoreFrontStyles {
    root?: IStyle;
    header?: IStyle;
    searchInputContainer?: IStyle;
    actions?: IStyle;
    body?: IStyle,
    section?: IStyle;
    sectionHeader?: IStyle;
    sectionTitle?: IStyle;
    sectionBody?: IStyle;
}

const defaultStyles = (theme : ITheme) : IListingStoreFrontStyles => {
    return {
        root: {
            
        },
        header: {
            paddingTop: 8,
            paddingBottom: 0,
            paddingLeft: 16,
            paddingRight: 16
        },
        searchInputContainer: {
            selectors: {
                ".ms-SearchBox": {
                    backgroundColor: theme.palette.white
                }
            }
        },
        body: {

        },
        section: {
            marginTop: 16
        },
        sectionHeader: {
            marginLeft: 16
        },
        sectionTitle: Object.assign({}, theme.fonts.large, {
            fontWeight: FontWeights.semibold
        }),
        sectionBody: {
            
        }
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IListingStoreFrontStyles | undefined) => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { IListingStoreFrontStyles, getStyles, defaultStyles, Defaults }