import { concatStyleSets, getTheme, IStyle, ITheme, memoizeFunction } from 'office-ui-fabric-react';

interface IListingActivityListStyles {
    root?: IStyle;
    activities?: IStyle;
    activity?: IStyle;
}

const defaultStyles = (theme : ITheme) : IListingActivityListStyles => {
    return {
        root: {
            
        },
        activities: {
            padding: 8
        },
        activity: {
           marginBottom: 12
        }
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IListingActivityListStyles) : IListingActivityListStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { IListingActivityListStyles, getStyles }

