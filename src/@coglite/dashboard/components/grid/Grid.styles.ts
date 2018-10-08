import { concatStyleSets, getTheme, IStyle, ITheme, memoizeFunction } from 'office-ui-fabric-react';

interface IGridStyles {
    root?: IStyle;
    gridCells?: IStyle;
    overlay?: IStyle;
    row?: IStyle;
    cell?: IStyle;
    portal?: IStyle;
}

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IGridStyles) => {
    if(!theme) {
        theme = getTheme();
    }

    const DefaultStyles : IGridStyles = {
        root: {
            position: "relative",
            overflow: "auto",
            background: "transparent",
            selectors: {
                "&.has-maximized": {
                    overflow: "hidden"
                }
            }
        },
        gridCells: {},
        overlay: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: theme.palette.white,
            opacity: 0.1,
            zIndex: 2
        },
        row: {
            display: "flex"
        },
        cell: {
            backgroundColor: theme.palette.neutralLight
        },
        portal: {
            boxShadow: `0 0 ${5}px 0 rgba(0, 0, 0, 0.4)`,
            transition: "top 0.2s ease, right 0.2s ease, bottom 0.2s ease, left 0.2s ease, width 0.2s ease, height 0.2s ease"
        }
    };

    return concatStyleSets(DefaultStyles, customStyles);
});

export { IGridStyles, getStyles }