import { HostAppView, IAppHostProps } from '@coglite/apphost';
import { IRequestHandler } from '@coglite/router';
import { observer } from 'mobx-react';
import * as React from 'react';

import { appRoutes, IAppRoute } from './AppRoutes';


interface IHomeHostAppViewProps extends IAppHostProps {
    title?: string;
}


@observer
class HomeHostAppView extends React.Component<IHomeHostAppViewProps, any> {
    private _onClickItem = (e, item) => {
        this.props.host.load({ path: item.path, replace: true });
    }
    private _updateHostTitle(props : IHomeHostAppViewProps) {
        props.host.setTitle(props.title || "");
    }
    componentWillMount() {
        this._updateHostTitle(this.props);
    }
    componentWillReceiveProps(nextProps : IHomeHostAppViewProps) {
        this._updateHostTitle(nextProps);
    }
    render() {
        const homeAppGroups = appRoutes.map(homeAppGroup => {
            
            const homeAppItems = homeAppGroup.items.map(item => {
                return {
                    key: item.path,
                    path: item.path,
                    name: item.title,
                    canCheck: true,
                    checked: this.props.host.path === item.path,
                    onClick: this._onClickItem
                }
            });
           
            const groupItem = {
                key: homeAppGroup.key,
                name: homeAppGroup.title,
                subMenuProps: {
                    items: homeAppItems
                }
            };

            return groupItem;

        });

        const items = [];
        
        items.push(
            {
                key: "title",
                name: this.props.host.title,
                subMenuProps: {
                    items: homeAppGroups
                }
            }
        );
        
        return (
            <HostAppView host={this.props.host} commandBarProps={{ items: items }}>
                {this.props.children}
            </HostAppView>
        );
    }
}

const homeAppHandler = (homeApp : IAppRoute) : IRequestHandler => {
    return (req => {
        return homeApp.moduleLoader().then(m => {
            const componentType = m[homeApp.moduleComponent || "default"];
            if(!componentType) {
                throw { code: "NOT_FOUND", message: "Unable to resolve component type [HomeHostAppView]"};
            }
            return (
                <HomeHostAppView host={req.app} title={homeApp.title}>
                    {React.createElement(componentType, Object.assign({}, req, { host: req.host }))}
                </HomeHostAppView>
            );
        });
    });
};

export { IHomeHostAppViewProps, HomeHostAppView, IAppHostProps, homeAppHandler }