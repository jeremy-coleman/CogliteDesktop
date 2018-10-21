//import 'core-js';
//import '@babel/polyfill'
import './AppConfig.js';

import {
    AppHostContainer,
    attachWindowMessaging,
    BrowserAppHost,
    ConfigContext,
    HostContext,
    RouterContext,
    themeState,
} from '@coglite/apphost';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { configure } from 'mobx';
import { Provider as MobxProvider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from 'theming';

import { AppRouter } from './AppRouter';



configure({ enforceActions: "observed" })

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


//initializeIcons(AppConfig.fabricIconBasePath);
initializeIcons();

const rootElement = document.createElement("div");
document.body.appendChild(rootElement);


// render
ReactDOM.render(
    <MobxProvider theme={themeState}>
        <ThemeProvider theme={themeState.combinedTheme}>
        <AppHostContainer host={host} />
        </ThemeProvider>
    </MobxProvider>,
    rootElement
);

