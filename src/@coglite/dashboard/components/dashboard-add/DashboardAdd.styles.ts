import { concatStyleSets, getTheme, IStyle, ITheme, memoizeFunction } from 'office-ui-fabric-react';

interface IDashboardAddStyles {
    root?: IStyle;
    editor?: IStyle;
    actions?: IStyle;
    action?: IStyle;
}

const defaultStyles = (theme : ITheme) : IDashboardAddStyles => {
    return {
        root: {},
        editor: {
            padding: 8
        },
        actions: {},
        action: {
            marginRight: 8
        }
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IDashboardAddStyles) : IDashboardAddStyles => {
    return concatStyleSets(Defaults.styles(theme || getTheme()), customStyles);
});

export {
    IDashboardAddStyles,
    getStyles,
    defaultStyles,
    Defaults
}

