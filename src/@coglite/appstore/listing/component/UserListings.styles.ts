import { concatStyleSets, getTheme, IStyle, ITheme, memoizeFunction } from 'office-ui-fabric-react';

interface IUserListingsStyles {
    root?: IStyle;
    list?: IStyle;
    listCell?: IStyle; 
}

const defaultStyles = (theme : ITheme) : IUserListingsStyles => {
    return {
        root: {},
        list: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center"
        },
        listCell: {
            margin: 8
        }
    }
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IUserListingsStyles) : IUserListingsStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export {
    IUserListingsStyles,
    defaultStyles,
    Defaults,
    getStyles
}