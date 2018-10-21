import * as React from "react";
import { observer } from "mobx-react";
import { IMutableSupplier, IAppHostModel } from "../types";
import { IRequest } from "@coglite/router";
import { IPanelProps, Panel, IPanel } from "office-ui-fabric-react";
import {  IAppContainerBaseProps} from "../App";
import { IconButton } from "office-ui-fabric-react";



import { AppHostModel, AppHostContainer, } from "../host";
import { Supplier } from "../models";

import {theme} from '../theme'
import {stylesheet} from 'typestyle'

export let panelStyles = stylesheet({
        root: {},
        navigation: {
            position: "relative",
            padding: "0px 5px",
            height: 44,
            display: "flex",
            justifyContent: "flex-end"
        },
        header: {
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            paddingLeft: 14
        },
        headerText: {
            fontSize: '17px',
            fontWeight: 100,
            color: theme.palette.neutralPrimary,
            lineHeight: 32,
            margin: 0
        },
        closeButton: {},
        panelIconButton: {
            height: "auto",
            width: 44,
            color: theme.palette.neutralSecondary,
            fontSize: '17px',
            $nest: {
                ':hover': {
                    color: theme.palette.neutralPrimary
                }
            }
        }
})




interface IAppPanelContainerProps extends IAppContainerBaseProps {
    requestSupplier: IMutableSupplier<IRequest>;
    panelProps?: IPanelProps;
    className?: string;
}

interface IAppPanelProps extends IAppContainerBaseProps {
    request: IRequest;
    panelProps?: IPanelProps;
    className?: string;
}



const getRequestSupplier = (host : IAppHostModel) : IMutableSupplier<IRequest> => {
    return host.getState("panelAppRequestSupplier", () => {
        return new Supplier<IRequest>();
    });
};


@observer
class AppPanel extends React.Component<IAppPanelProps, any> {
    private _panel : IPanel;
    protected _host : AppHostModel;
    constructor(props : IAppPanelProps) {
        super(props);
        this._host = new AppHostModel();
        this._host.setRoot(this.props.root ? true : false);
        this._host.router = this.props.router;
        this._host.launcher = this.props.launcher;
        this._host.setDefaultRequest(this.props.request);
    }
    get host() : IAppHostModel {
        return this._host;
    }
    componentWillReceiveProps(nextProps : IAppPanelProps) {
        if(nextProps.router !== this.props.router) {
            this._host.setRoot(this.props.root ? true : false);
            this._host.router = nextProps.router;
            this._host.launcher = nextProps.launcher;
        }
        this._host.load(Object.assign({}, nextProps.request, { replace: true }));
    }
    private _onPanelRef = (panel : IPanel) => {
        this._panel = panel;
    }
    private _onRenderHeader = (props : IPanelProps) => {
        return null;
    }
    private _onClickClose = () => {
        this._panel.dismiss();
    }
    private _onRenderNavigation = (props : IPanelProps) => {

        return (
            <div className={panelStyles.navigation}>
                <div className={panelStyles.header}>
                    <p className={panelStyles.headerText}>
                        {props.headerText}
                    </p>
                </div>
                <IconButton
                    className={panelStyles.panelIconButton}
                    onClick={this._onClickClose}
                    ariaLabel={props.closeButtonAriaLabel}
                    data-is-visible={true}
                    iconProps={{ iconName: 'Cancel' }} />
            </div>
        );
    }
    render() {
        const { request } = this.props;
        const panelProps = Object.assign({}, this.props.panelProps, request.panelProps);
        return (
            <Panel {...panelProps}
                   isOpen={request ? true : false}
                   headerText={this.host.title}
                   onRenderHeader={this._onRenderHeader}
                   onRenderNavigation={this._onRenderNavigation}
                   isLightDismiss={true}
                   componentRef={this._onPanelRef}
                   className={panelStyles.root}>
                <AppHostContainer host={this.host} onRenderSync={this.props.onRenderSync} onRenderError={this.props.onRenderError} />
            </Panel>
        );
    }
}

@observer
class AppPanelContainer extends React.Component<IAppPanelContainerProps, any> {
    private _onDismissed = () => {
        this.props.requestSupplier.clearValue();
    }
    render() {
        const { requestSupplier, className, onRenderError, onRenderSync, launcher, router } = this.props;
        if(requestSupplier.value) {
            const panelProps : IPanelProps = Object.assign({}, this.props.panelProps, {
                onDismissed: this._onDismissed
            });
            return <AppPanel request={requestSupplier.value}
                            launcher={launcher}
                            router={router}
                            onRenderError={onRenderError}
                            onRenderSync={onRenderSync}
                            className={className}
                            panelProps={panelProps}
                    />;
        }
        return null;
    }
}

export {
    IAppPanelProps,
    IAppPanelContainerProps,
    AppPanel,
    AppPanelContainer,
    getRequestSupplier
}