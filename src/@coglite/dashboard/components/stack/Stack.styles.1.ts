import {stylesheet, types} from 'typestyle'

type IStyle = types.CSSProperties

interface IStackStyles {
    root?: IStyle;
    header?: IStyle;
    tabBar?: IStyle;
    actionBar?: IStyle;
    action?: IStyle;
    actionIcon?: IStyle;
    addAction?: IStyle;
    tab?: IStyle;
    tabTitleContainer?: IStyle;
    tabTitle?: IStyle;
    tabActionBar?: IStyle;
    tabAction?: IStyle;
    tabActionIcon?: IStyle;
    tabPanel?: IStyle;
    body?: IStyle;
    dragOverlay?: IStyle;
    dragFeedbackContainer?: IStyle;
    dragFeedback?: IStyle;
}

const defaultStyles = theme => stylesheet({
        root: {
            /*
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            overflow: "hidden"
            */
        },
        header: {
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            backgroundColor: theme.palette.neutralTertiary,
            color: theme.palette.white,
            overflow: "hidden"
        },
        tabBar: {
            background: "transparent",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            height: "100%"
        },
        tab: {
            position: "relative",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            overflow: "hidden",
            backgroundColor: theme.palette.neutralTertiary,
            color: theme.palette.neutralSecondary,
            cursor: "pointer",
            height: "100%",
            transition: "background-color 0.3s ease",
            zIndex: 0,
            $nest: {
                ".close-action": {
                    visibility: "hidden"
                },
                "&.active": {
                    backgroundColor: theme.palette.neutralLighter,
                    color: theme.palette.neutralPrimary,
                    boxShadow: `3px 0px 3px -2px ${theme.palette.neutralSecondary}, -3px 0px 3px -2px ${theme.palette.neutralSecondary}`,
                    zIndex: 1,
                    $nest: {
                        ".close-action": {
                            visibility: "visible"
                        },
                        ":hover": {
                            backgroundColor: theme.palette.neutralLighter
                        }
                    }
                },
                ":hover": {
                    $nest: {
                        ".close-action": {
                            visibility: "visible"
                        }
                    },
                    backgroundColor: theme.palette.neutralQuaternaryAlt
                }
            }
        },
        addAction: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.palette.neutralTertiary,
            color: theme.palette.neutralPrimary,
            outline: "none",
            border: "none",
            height: "100%",
            width: 28,
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            $nest: {
                ":hover": {
                    backgroundColor: theme.palette.neutralQuaternaryAlt
                },
                "& .stack-add-action-icon": {
                    color: theme.palette.neutralPrimary,
                    fontSize: theme.fonts.medium.fontSize
                }
            }
        },
        tabTitleContainer: {
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            maxWidth: 130,
            overflow: "hidden",
            paddingLeft: 8,
            paddingRight: 8
        },
        tabTitle: {
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            fontSize: theme.fonts.medium.fontSize
        },
        tabAction: {
            color: theme.palette.neutralPrimary,
            marginLeft: 8,
            marginRight: 8,
            height: 16,
            width: 16,
            lineHeight: 16,
            padding: "0px",
            outline: "none",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            $nest: {
                "&.active": {
                    color: theme.palette.neutralPrimary
                },
                "&.close-action": {
                    $nest: {
                        ":hover": {
                            color: theme.palette.white,
                            backgroundColor: theme.palette.redDark
                        }
                    }
                }
            }
        },
        tabActionIcon: {
            lineHeight: theme.fonts.tiny.fontSize,
            fontSize: theme.fonts.tiny.fontSize,
            fontWeight: 400,
            margin: 0,
            height: theme.fonts.tiny.fontSize,
            width: theme.fonts.tiny.fontSize
        },
        tabActionBar: {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center"
        },
        tabPanel: {

        },
        action: {
            color: theme.palette.neutralPrimary,
            height: "100%",
            background: "transparent",
            border: "none",
            outline: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            $nest: {
                "&.close-action": {
                    $nest: {
                        ":hover": {
                            color: theme.palette.white,
                            backgroundColor: theme.palette.redDark
                        }
                    }
                }
            }
        },
        actionIcon: {
            fontSize: theme.fonts.small.fontSize,
            fontWeight: 400
        },
        actionBar: {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            backgroundColor: theme.palette.neutralTertiary
        },
        body: {
            position: "absolute",
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: theme.palette.white,
            boxShadow: `0px -3px 3px -2px ${theme.palette.neutralSecondary}`,
        },
        dragOverlay: {
            position: "absolute",
            left: 0,
            bottom: 0,
            right: 0,
            background: theme.palette.white,
            opacity: 0.2,
            zIndex: 3
        },
        dragFeedbackContainer: {
            position: "absolute",
            left: 0,
            bottom: 0,
            right: 0,
            background: "transparent",
            zIndex: 2
        },
        dragFeedback: {
            position: "absolute",
            transition: "all 100ms ease",
            backgroundColor: theme.palette.neutralTertiary,
            opacity: 0.5
        }
    })

