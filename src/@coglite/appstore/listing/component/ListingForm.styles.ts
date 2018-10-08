import { concatStyleSets, FontSizes, getTheme, IStyle, ITheme, memoizeFunction } from 'office-ui-fabric-react';

interface IListingFormStyles {
    root?: IStyle;
    editor?: IStyle;
    section?: IStyle;
    sectionTitle?: IStyle;
    sectionBody?: IStyle;
    actions?: IStyle;
}

const defaultStyles = (theme : ITheme) : IListingFormStyles => {
    return {
        root: {
            padding: 10
        },
        editor: {

        },
        section: {

        },
        sectionTitle: {
            fontSize: FontSizes.icon,
            margin: 0,
            paddingTop: 16,
            paddingBottom: 16
        },
        sectionBody: {

        },
        actions: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            selectors: {
                ".action+.action": {
                    marginLeft: 8
                }
            }
        }
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IListingFormStyles | undefined) : IListingFormStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { IListingFormStyles, getStyles, defaultStyles, Defaults }

