import { concatStyleSets, getTheme, IStyle, ITheme, memoizeFunction } from 'office-ui-fabric-react';

interface IListingReviewFormStyles {
    root?: IStyle;
    editor?: IStyle;
    actions?: IStyle;
}

const defaultStyles = (theme : ITheme) : IListingReviewFormStyles => {
    return  {
        root: {
            boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.4)"
        },
        editor: {
            selectors: {
                ".rating": {
                    padding: "4px 8px"
                },
                ".review": {
                    padding: "4px 8px"
                }
            }
        },
        actions: {
            padding: "4px 8px",
            selectors: {
                ".ms-Button+.ms-Button": {
                    marginLeft: 8
                }
            }
        }
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IListingReviewFormStyles | undefined) : IListingReviewFormStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { IListingReviewFormStyles, getStyles, defaultStyles, Defaults }