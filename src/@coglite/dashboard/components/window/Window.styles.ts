import { concatStyleSets, FontSizes, FontWeights, getTheme, IStyle, ITheme, memoizeFunction } from 'office-ui-fabric-react';

interface IWindowStyles {
    root?: IStyle;
    header?: IStyle;
    titleContainer?: IStyle;
    title?: IStyle;
    actionBar?: IStyle;
    action?: IStyle;
    body?: IStyle;
    resize?: IStyle;
}

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IWindowStyles) => {
    if(!theme) {
        theme = getTheme();
    }

    const DefaultStyles : IWindowStyles = {
        root: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: theme.palette.white,
            borderColor: theme.palette.neutralSecondary,
            borderStyle: "solid",
            selectors: {
                "&.content-hidden": {
                    height: 28
                },
                "&.maximized": {
                    zIndex: 4
                }
            }
        },
        header: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "flex-start",
            cursor: "pointer",
            overflow: "hidden",
            backgroundColor: theme.palette.neutralSecondary,
            color: theme.palette.white
        },
        titleContainer: {
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            overflow: "hidden",
            paddingLeft: 8,
            paddingRight: 8
        },
        title: {
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap"
        },
        action: {
            color: theme.palette.white,
            height: 28,
            width: 28,
            lineHeight: 28,
            cursor: "pointer",
            padding: "0px",
            outline: "none",
            border: "none",
            background: "transparent",
            selectors: {
                ":hover": {
                    color: theme.palette.white,
                    backgroundColor: theme.palette.neutralTertiary
                },
                "&.close-action": {
                    selectors: {
                        ":hover": {
                            color: theme.palette.white,
                            backgroundColor: theme.palette.redDark
                        }
                    }
                },
                "& .window-action-icon": {
                    lineHeight: "16px",
                    fontSize: FontSizes.mini,
                    fontWeight: FontWeights.regular,
                    margin: "0px",
                    height: "16px",
                    width: "16px"
                }
            }
        },
        actionBar: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center"
        },
        body: {
            position: "absolute",
            left: 0,
            bottom: 0,
            right: 0,
            overflow: "auto",
            backgroundColor: theme.palette.white,
            selectors: {
                "&.content-hidden": {
                    height: 0,
                    overflow: "hidden"
                }
            }
        },
        resize: {
            selectors: {
                "&.top": {
                    position: "absolute",
                    zIndex: 2,
                    top: -2,
                    height: 5,
                    left: 0,
                    right: 0,
                    cursor: "n-resize"
                },
                "&.right": {
                    position: "absolute",
                    zIndex: 2,
                    right: -2,
                    width: 5,
                    top: 0,
                    bottom: 0,
                    cursor: "e-resize"
                },
                "&.bottom": {
                    position: "absolute",
                    zIndex: 2,
                    bottom: -2,
                    height: 5,
                    left: 0,
                    right: 0,
                    cursor: "s-resize"
                },
                "&.left": {
                    position: "absolute",
                    zIndex: 2,
                    left: -2,
                    width: 5,
                    top: 0,
                    bottom: 0,
                    cursor: "w-resize"
                },
                "&.topLeft": {
                    position: "absolute",
                    zIndex: 3,
                    left: -4,
                    top: -4,
                    width: 10,
                    height: 10,
                    cursor: "nw-resize"
                },
                "&.topRight": {
                    position: "absolute",
                    zIndex: 3,
                    right: -4,
                    top: -4,
                    width: 10,
                    height: 10,
                    cursor: "ne-resize"
                },
                "&.bottomLeft": {
                    position: "absolute",
                    zIndex: 3,
                    left: -4,
                    bottom: -4,
                    width: 10,
                    height: 10,
                    cursor: "sw-resize"
                },
                "&.bottomRight": {
                    position: "absolute",
                    zIndex: 3,
                    right: -4,
                    bottom: -4,
                    width: 10,
                    height: 10,
                    cursor: "se-resize"
                }
            }
        }
    };

    return concatStyleSets(DefaultStyles, customStyles);
});

export { IWindowStyles, getStyles }