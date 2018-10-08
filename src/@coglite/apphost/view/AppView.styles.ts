import { concatStyleSets, getTheme, IStyle, ITheme, memoizeFunction } from 'office-ui-fabric-react';

interface IAppViewStyles {
    root?: IStyle;
    menuContainer?: IStyle;
    main?: IStyle;
}

interface IAppViewCommandBarStyles {
    root?: IStyle;
    item?: IStyle;
}

const defaultStyles = (theme : ITheme) : IAppViewStyles => {
    return {
        root: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "hidden"
        },
        menuContainer: {
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            height: 40,
            zIndex: 20000,
            // this is pretty shitty - basically trying to pave over the lack of office-ui-fabric-react use for command bar
            selectors: {
                "&.rootView": {
                    selectors: {
                        ".ms-CommandBar": {
                            backgroundColor: theme.palette.neutralDark,
                            selectors: {
                                ".ms-Button--commandBar": {
                                    backgroundColor: theme.palette.neutralDark,
                                    color: theme.palette.neutralLighter,
                                    selectors: {
                                        ".ms-Button-icon": {
                                            color: theme.palette.neutralLighter
                                        },
                                        ".ms-Button-menuIcon": {
                                            color: theme.palette.neutralLighter
                                        },
                                        ":hover": {
                                            backgroundColor: theme.palette.neutralPrimary
                                        }
                                    }
                                },
                                ".ms-CommandBarItem": {
                                    selectors: {
                                        ":hover": {
                                            backgroundColor: theme.palette.neutralPrimary
                                        }
                                    }
                                },
                                ".ms-CommandBarItem-text": {
                                    backgroundColor: theme.palette.neutralDark,
                                    color: theme.palette.neutralLighter
                                },
                                ".ms-CommandBarItem-link": {
                                    backgroundColor: theme.palette.neutralDark,
                                    color: theme.palette.neutralLighter,
                                    selectors: {
                                        ".ms-Button-icon": {
                                            color: theme.palette.neutralLighter
                                        },
                                        ".ms-Button-menuIcon": {
                                            color: theme.palette.neutralLighter
                                        },
                                        ":hover": {
                                            backgroundColor: theme.palette.neutralPrimary
                                        }
                                    }
                                },
                                ".ms-SearchBox": {
                                    backgroundColor: theme.palette.neutralSecondary,
                                    color: theme.palette.white,
                                    selectors: {
                                        ".ms-SearchBox-icon": {
                                            color: theme.palette.neutralLight
                                        },
                                        ".ms-SearchBox-field": {
                                            backgroundColor: theme.palette.neutralSecondary,
                                            color: theme.palette.white
                                        },
                                        ".ms-SearchBox-clearButton": {
                                            selectors: {
                                                ".ms-Button-icon": {
                                                    color: theme.palette.neutralLight
                                                }
                                            }
                                        }
                                    }
                                },
                                ".ms-TextField": {
                                    selectors: {
                                        ".ms-TextField-fieldGroup": {
                                            border: `1px solid ${theme.palette.neutralPrimary}`,
                                            backgroundColor: theme.palette.neutralSecondary,
                                            color: theme.palette.white,
                                            selectors: {
                                                ".ms-TextField-prefix": {
                                                    backgroundColor: theme.palette.neutralPrimaryAlt,
                                                    color: theme.palette.white,
                                                    selectors: {
                                                        ".ms-Button": {
                                                            backgroundColor: "transparent",
                                                            color: theme.palette.white,
                                                            ".ms-Button-icon": {
                                                                color: theme.palette.white
                                                            }
                                                        }
                                                    }
                                                },
                                                ".ms-TextField-field": {
                                                    color: theme.palette.white,
                                                    selectors: {
                                                        "::placeholder": {
                                                            color: theme.palette.neutralTertiary
                                                        }
                                                    }
                                                },
                                                ".ms-TextField-suffix": {
                                                    backgroundColor: theme.palette.neutralPrimaryAlt,
                                                    color: theme.palette.white,
                                                    selectors: {
                                                        ".ms-Button": {
                                                            backgroundColor: "transparent",
                                                            color: theme.palette.white,
                                                            ".ms-Button-icon": {
                                                                color: theme.palette.white
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        main: {
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            overflow: "auto",
            selectors: {
                "&.hasMenu": {
                    top: 40
                }
            }
        }
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IAppViewStyles) : IAppViewStyles => {
    return concatStyleSets(Defaults.styles(theme || getTheme()), customStyles);
});

export {
    IAppViewStyles,
    IAppViewCommandBarStyles,
    getStyles,
    defaultStyles,
    Defaults
}