import { AppLink } from '@coglite/apphost';
import { IRequest } from '@coglite/router';
import * as React from 'react';

import ScreenShareOutlined from '@material-ui/icons/ScreenShareOutlined'

import {theme} from '@coglite/apphost'

import { appRoutes } from './AppRoutes';
import { HomeHostAppView, IAppHostProps } from './HomeHostAppView';

import { observer } from 'mobx-react';

interface IHomeAppTileLinkProps extends IAppHostProps {
    request: IRequest;
}

export let HomeAppTileLink = observer((props: IHomeAppTileLinkProps) => {
        return (
            <AppLink 
                host={props.host}
                request={props.request}
                style={{ textDecoration: "none" }}
                title={props.request.title}
            >
            <div style={{ position: "relative", width: 100, height: 100, margin: 10, boxShadow: "0 0 5px 0px rgba(0,0,0,0.4)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", top: 0, right: 0, left: 0, height: 60,     backgroundColor: theme.palette.neutralLight }}>
                    <ScreenShareOutlined/>
                    </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", fontSize: 10, top: 60, right: 0, bottom: 0, left: 0, backgroundColor: theme.palette.primary.main, color: theme.palette.white }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 8 }}>
                            {props.request.title}
                        </div>
                    </div>
                </div>
            </AppLink>
        );
})

// class HomeAppTileLink extends React.Component<IHomeAppTileLinkProps, any> {
//     render() {
//         return (
//             <AppLink 
//                 host={props.host}
//                 request={props.request}
//                 style={{ textDecoration: "none" }}
//                 title={props.request.title}
//             >
//             <div style={{ position: "relative", width: 100, height: 100, margin: 10, boxShadow: "0 0 5px 0px rgba(0,0,0,0.4)" }}>
//             <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", top: 0, right: 0, left: 0, height: 60,     backgroundColor: theme.palette.neutralLight }}>
//                     <ScreenShareOutlined/>
//                     </div>
//             <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", fontSize: 10, top: 60, right: 0, bottom: 0, left: 0, backgroundColor: theme.palette.primary.main, color: theme.palette.white }}>
//                         <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 8 }}>
//                             {props.request.title}
//                         </div>
//                     </div>
//                 </div>
//             </AppLink>
//         );
//     }
// }


export let Home = observer((props: IAppHostProps) => {
        return (
            <HomeHostAppView host={props.host} title="Home">
                <div>
                    <div style={{ padding: 8 }}>
                        <h2>Home</h2>
                        <div>
                            {appRoutes.map(group => {
                                return (
                                    <div key={group.key}>
                                        <h3>{group.title}</h3>
                                        <div style={{ display: "flex", flexWrap: "wrap", padding: 8 }}>
                                            {group.items.map(item => {
                                                return (
                                                    <HomeAppTileLink 
                                                        key={item.path}
                                                        host={props.host}
                                                        request={Object.assign({}, item, { replace: true })}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </HomeHostAppView>
        );
    })

