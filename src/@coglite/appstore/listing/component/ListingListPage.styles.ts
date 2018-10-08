import { IStyle, ITheme, getTheme, concatStyleSets } from "office-ui-fabric-react";
import { memoizeFunction } from "office-ui-fabric-react";

interface IListingListPageStyles {
    root?: IStyle;
    input?: IStyle;
    results?: IStyle;
}

const defaultStyles = (theme : ITheme) : IListingListPageStyles => {
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

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IListingListPageStyles | undefined) : IListingListPageStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { IListingListPageStyles, getStyles, defaultStyles, Defaults }