import { ListingViewConfig } from '@coglite/appstore';
import { AppstorePathsContext } from '@coglite/appstore';
import { createUserProfileMenu } from '@coglite/appstore';
import { getRequestSupplier } from '@coglite/apphost';
import { AppPanelContainer } from '@coglite/apphost';
import { IAppProps } from '@coglite/apphost';
import { IAppHost } from '@coglite/apphost';
import { IMutableSupplier } from '@coglite/apphost';
import { IRequest } from '@coglite/router';
import { DashboardListAppView } from '@coglite/dashboard';
import { IContextualMenuItem } from 'office-ui-fabric-react';
import { PanelType } from 'office-ui-fabric-react';
import * as React from 'react';

import { DashboardListStore } from '../model/DashboardListStore';
import { BrandButton } from './BrandButton';

class DashboardsApp extends React.Component<IAppProps, any> {
    get host() : IAppHost {
        return this.props.match.host;
    }
    get panelAppRequestSupplier() : IMutableSupplier<IRequest> {
        return getRequestSupplier(this.host);
    }
    get userProfile() {
        return this.props.match.userProfile;
    }
    private _onClickHelp = () => {
        this.panelAppRequestSupplier.value = { path: "/help", panelProps: { type: PanelType.medium } };
    }
    private _onClickAbout = () => {
        this.panelAppRequestSupplier.value = { path: "/about", panelProps: { type: PanelType.medium } };
    }
    private _onClickBrand = () => {
        this.host.load({ path: "/index" });
    }
    private _onClickShop = () => {
        this.panelAppRequestSupplier.value = { path: AppstorePathsContext.value.store() };
    }
    private _launchPanelApp = (request : IRequest) => {
        return this.host.open(request);
    }
    componentWillMount() {
        this.host.setTitle("Dashboards");
    }
    private _onRenderBrand = () => {
        return <BrandButton onClick={this._onClickBrand} />;
    }
    render() {
        const items : IContextualMenuItem[] = [
            {
                key: "brand",
                text: "Coglite",
                onRender: this._onRenderBrand
            }
        ];
        const farItems : IContextualMenuItem[] = [];
        // shop/store
        const storeMenu : IContextualMenuItem = {
            key: "store",
            title: ListingViewConfig.storeLabel,
            iconProps: {
                iconName: "Shop"
            },
            onClick: this._onClickShop
        };
        farItems.push(storeMenu);

        // help
        const helpMenu : IContextualMenuItem = {
            key: "helpMenu",
            iconProps: {
                iconName: "Help"
            },
            subMenuProps: {
                items: [
                    {
                        key: "help",
                        text: "Coglite help",
                        iconProps: {
                            iconName: "Help"
                        },
                        onClick: this._onClickHelp
                    },
                    {
                        key: "about",
                        text: "About Coglite",
                        iconProps: {
                            iconName: "Info"
                        },
                        onClick: this._onClickAbout
                    }
                ]
            }
        };
        farItems.push(helpMenu);

        // user profile
        if(this.userProfile) {
            farItems.push(createUserProfileMenu(this.userProfile));
        }
        return (
            <DashboardListAppView dashboardList={DashboardListStore}
                                  host={this.host}
                                  commandBarProps={{ items: items, farItems: farItems }}>
                <AppPanelContainer requestSupplier={this.panelAppRequestSupplier}
                                   launcher={this._launchPanelApp}
                                   router={this.host.router}
                                   panelProps={{ type: PanelType.large }} />
            </DashboardListAppView>
        );
    }
}

export { DashboardsApp, DashboardsApp as default }