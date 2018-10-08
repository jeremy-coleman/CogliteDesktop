import { concatStyleSets, getTheme, IStyle, ITheme, memoizeFunction } from 'office-ui-fabric-react';

interface IListingLinkFormStyles {
    root?: IStyle;
    editor?: IStyle;
    editors?: IStyle;
    nameField?: IStyle;
    urlField?: IStyle;
    removeAction?: IStyle;
    actions?: IStyle;
}

const defaultStyles = (theme : ITheme) : IListingLinkFormStyles => {
    return {
        root: {
           
        },
        editor: {
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center"
        },
        editors: {
            marginBottom: 8,
            selectors: {
                "$editor+$editor": {
                    marginTop: 8
                }
            }
        },
        nameField: {
            marginRight: 8,
            width: "30%"
        },
        urlField: {
            marginLeft: 8,
            width: "50%"
        },
        removeAction: {
            marginLeft: 8
        },
        actions: {
            
        }
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme: ITheme, customStyles?: IListingLinkFormStyles) : IListingLinkFormStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { IListingLinkFormStyles, getStyles, defaultStyles, Defaults }

