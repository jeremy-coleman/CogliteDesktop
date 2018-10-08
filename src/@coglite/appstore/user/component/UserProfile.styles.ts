import { concatStyleSets, FontSizes, FontWeights, getTheme, IStyle, ITheme, memoizeFunction } from 'office-ui-fabric-react';

interface IUserProfileStyles {
    root?: IStyle;
    userInfo?: IStyle;
    body?: IStyle;
    groups?: IStyle;
    groupsTitle?: IStyle;
    groupList?: IStyle;
    group?: IStyle;
}

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IUserProfileStyles | undefined) => {
    if(!theme) {
        theme = getTheme();
    }
    const DefaultStyles : IUserProfileStyles = {
        root: {
            minWidth: 300
        },
        userInfo: {
            padding: 8
        },
        body: {
            borderTop: `1px solid ${theme.palette.neutralLight}`
        },
        groups: {
            padding: 8,
            lineHeight: FontSizes.medium
        },
        groupsTitle: {
            fontSize: FontSizes.medium,
            fontWeight: FontWeights.semibold,
            margin: 0,
            paddingTop: 4,
            paddingBottom: 8
        },
        groupList: {
        
        },
        group: {
            backgroundColor: theme.palette.neutralSecondary,
            color: theme.palette.white,
            fontSize: FontSizes.medium,
            lineHeight: FontSizes.medium,
            fontWeight: FontWeights.semilight,
            padding: 4,
            borderRadius: 4,
            margin: 4,
            textAlign: "center",
            verticalAlign: "middle"
        }
    };
    return concatStyleSets(DefaultStyles, customStyles);
});


export { IUserProfileStyles, getStyles }