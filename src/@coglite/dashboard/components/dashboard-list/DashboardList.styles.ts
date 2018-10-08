import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights } from "office-ui-fabric-react";
import { memoizeFunction } from "office-ui-fabric-react";

interface IDashboardListStyles {
    root?: IStyle;
}

const defaultStyles = (theme : ITheme) : IDashboardListStyles => {
    return {
        root: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "hidden"
        }
    }
};

const StyleConfig = {
    defaultStyles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IDashboardListStyles) => {
    return concatStyleSets(StyleConfig.defaultStyles(theme || getTheme()), customStyles);
});

export { IDashboardListStyles, getStyles, StyleConfig }