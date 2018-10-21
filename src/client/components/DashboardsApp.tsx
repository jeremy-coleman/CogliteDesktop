import { AppPanelContainer, getRequestSupplier, IAppHostModel, IAppProps, IMutableSupplier } from '@coglite/apphost';
import { AppstorePathsContext, createUserProfileMenu, ListingViewConfig } from '@coglite/appstore';
import { DashboardListAppView } from '@coglite/dashboard';
import { IRequest } from '@coglite/router';
import { PanelType } from 'office-ui-fabric-react';
import * as React from 'react';

import { DashboardListStore } from '../model/DashboardListStore';
import { BrandButton } from './BrandButton';
import { TestButton } from './TestButton';


class DashboardsApp extends React.Component<IAppProps, any> {
    get host() : IAppHostModel {
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

    private _onRenderTester = () => {
        return <TestButton/>;
    }



    render() {
        const items = [
            {
                key: "brand",
                text: "Coglite",
                onRender: this._onRenderBrand
            },
            {
                key: "test",
                //text: "Coglite",
                onRender: this._onRenderTester
            }
        ];
        const farItems = [];

        // shop/store
        const storeMenu = {
            key: "store",
            title: ListingViewConfig.storeLabel,
            iconProps: {
                iconName: "Shop"
            },
            onClick: this._onClickShop
        };
        farItems.push(storeMenu);

        // help
        const helpMenu = {
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
                                   panelProps={{type: PanelType.large }} //type: PanelType.large 
                />
            </DashboardListAppView>
        );
    }
}

export { DashboardsApp, DashboardsApp as default }