import { concatStyleSets, FontSizes, FontWeights, getTheme, IStyle, ITheme, memoizeFunction } from 'office-ui-fabric-react';

interface IAppPanelStyles {
    root?: IStyle;
    navigation?: IStyle;
    header?: IStyle;
    headerText?: IStyle;
    closeButton?: IStyle;
}

const defaultStyles = (theme : ITheme) : IAppPanelStyles => {
    return {
        root: {},
        navigation: {
            position: "relative",
            padding: "0px 5px",
            height: 44,
            display: "flex",
            justifyContent: "flex-end"
        },
        header: {
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            paddingLeft: 14
        },
        headerText: {
            fontSize: FontSizes.large,
            fontWeight: FontWeights.light,
            color: theme.palette.neutralPrimary,
            lineHeight: 32,
            margin: 0
        },
        closeButton: {
            
        }
    }
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IAppPanelStyles) : IAppPanelStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { IAppPanelStyles, getStyles }