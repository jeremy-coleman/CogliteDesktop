import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights, FontSizes } from "office-ui-fabric-react";
import { memoizeFunction } from "office-ui-fabric-react";

interface IListingStyles {
    root?: IStyle;
    appDetails?: IStyle;
    content?: IStyle;
    metadata?: IStyle;
    metadataSection?: IStyle;
    metadataSectionTitle?: IStyle;
    metadataSectionContent?: IStyle;
    title?: IStyle;
    overview?: IStyle;
    shortDescription?: IStyle;
    detailContent?: IStyle;
    detailTabs?: IStyle;
    description?: IStyle;
    actions?: IStyle;
    banner?: IStyle;
    rating?: IStyle;
    ratingStars?: IStyle;
    reviewCount?: IStyle;
}

const defaultStyles = (theme : ITheme) : IListingStyles => {
    return {
        root: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "hidden"
        },
        metadata: {
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: 240,
            paddingTop: 8,
            paddingLeft: 12,
            paddingBottom: 8,
            overflow: "auto"
        },
        metadataSection: {
            marginTop: 8
        },
        metadataSectionTitle: {
            margin: 0,
            paddingBottom: 4,
            fontSize: FontSizes.small,
            fontWeight: FontWeights.semibold
        },
        metadataSectionContent: {
            fontWeight: FontWeights.light,
            fontSize: FontSizes.small
        },
        detailContent: {
            position: "absolute",
            left: 260,
            top: 0,
            bottom: 0,
            right: 0,
            paddingTop: 8,
            paddingRight: 12,
            overflow: "auto"
        },
        detailTabs: {

        },
        title: {
            paddingLeft: 8,
            fontSize: FontSizes.xLarge,
            fontWeight: FontWeights.semibold
        },
        overview: {
            paddingTop: 8
        },
        shortDescription: {
            padding: 8,
            fontSize: FontSizes.mediumPlus,
            fontWeight: FontWeights.semibold
        },
        actions: {
            display: "flex",
            alignItems: "center",
            marginTop: 8,
            selectors: {
                ".ms-Button+.ms-Button": {
                    marginLeft: 8
                }
            }
        },
        description: {
            padding: 8,
            whiteSpace: "pre-wrap",
            fontSize: FontSizes.medium,
            fontWeight: FontWeights.semilight
        },
        banner: {
            width: 220,
            height: 137,
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.palette.neutralLight
        },
        rating: {
            marginTop: 8,
            display: "flex"
        },
        ratingStars: {
            color: theme.palette.yellow
        },
        reviewCount: {
            paddingLeft: 8
        }
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IListingStyles | undefined) => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});


export { IListingStyles, getStyles, defaultStyles, Defaults }