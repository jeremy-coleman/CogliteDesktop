//import './main.scss';
import 'core-js';
import './AppConfig.js'


import {
    AppHostContainer,
    attachWindowMessaging,
    BrowserAppHost,
    ConfigContext,
    HostContext,
    RouterContext,
} from '@coglite/apphost';
import { initializeIcons } from '@uifabric/icons';
import { configure } from 'mobx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {ThemeProvider} from 'theming'

import { AppRouter } from './AppRouter';

configure({ enforceActions: "never" })

attachWindowMessaging(window);

const host = new BrowserAppHost();
host.setRoot(true);
host.window = window;
host.router = AppRouter;
host.publicPath = AppConfig.publicPath;

// app context config
ConfigContext.value = AppConfig;
RouterContext.value = AppRouter;
HostContext.value = host;

// fabric icon initialization
initializeIcons(AppConfig.fabricIconBasePath);
//initializeIcons();

//@ts-ignore
console.log(pkgInfo)

const el = document.createElement("div");
document.body.appendChild(el);


import {themeState} from '@coglite/apphost'
import {Provider as MobxProvider} from 'mobx-react'

// render
ReactDOM.render(
    <MobxProvider theme={themeState}>
        <ThemeProvider theme={themeState.combinedTheme}>
        <AppHostContainer host={host} />
        </ThemeProvider>
    </MobxProvider>
        ,
    el
);

// ReactDOM.render(
//     <Fabric className="coglite-desktop">
//         <AppHostContainer host={host} />
//     </Fabric>,
//     el
// );