// global style overrides
import { FontSizes, FontWeights, getTheme, IStyle } from 'office-ui-fabric-react';

const commandBarHeight = 28;

const theme = getTheme();

const commandBarStyles : IStyle = {
    height: commandBarHeight,
    selectors: {
        "&.rootView": {
            selectors: {
                ".ms-CommandBar": {
                    selectors: {
                        ".ms-CommandBarItem-link": {
                            selectors: {
                                ".ms-Button-menuIcon": {
                                    color: theme.palette.neutralLight
                                }
                            }
                        }
                    }
                }
            }
        },
        ".ms-CommandBar-primaryCommands": {
            marginLeft: 0,
            lineHeight: commandBarHeight
        },
        ".ms-CommandBarItem": {
            height: commandBarHeight,
            selectors: {
                ":hover": {
                    backgroundColor: theme.palette.neutralPrimary
                },
                ".ms-Icon, .ms-Button-icon": {
                    fontSize: FontSizes.small
                },
                ".ms-Button": {
                    lineHeight: commandBarHeight,
                    fontSize: FontSizes.small
                },
                ".ms-CommandBarItem-link": {
                    lineHeight: commandBarHeight,
                    fontSize: FontSizes.small
                },
                ".ms-CommandBarItem-commandText": {
                    lineHeight: commandBarHeight,
                    fontSize: FontSizes.small
                },
                ".ms-CommandBarItem-text": {
                    lineHeight: commandBarHeight,
                    fontSize: FontSizes.small
                },
                ".ms-CommandBarItem-custom-button": {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: FontSizes.medium,
                    fontWeight: FontWeights.regular,
                    color: theme.palette.themeSecondary,
                    position: "relative",
                    background: "0 0",
                    border: "none",
                    lineHeight: commandBarHeight,
                    minWidth: 20,
                    textAlign: "center",
                    padding: "0 4px",
                    height: "100%",
                    cursor: "pointer",
                    outline: "transparent",
                    selectors: {
                        "&[disabled]": {
                            color: theme.palette.neutralTertiary
                        },
                        ".material-icons": {
                            padding: "0px 4px"
                        }
                    }
                }
            }
        }
    }
};

/*
const appViewOverrides = (theme : ITheme) => {
    const ds = defaultStyles(theme);
    return concatStyleSets(ds, {
        menuContainer: {
            height: commandBarHeight,
            selectors: {
                ".ms-CommandBar": commandBarStyles
            }
        },
        main: {
            selectors: {
                "&.hasMenu": {
                    top: commandBarHeight
                }
            },
            backgroundImage: `url("${backgroundImageUrl}")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50% 60%"
        }
    })
};

Defaults.styles = appViewOverrides;
*/