import { IEventEmitter, ISupplierFunc } from '@coglite/apphost';
import { IRequest, IRouter } from '@coglite/router';
import { computed, observable } from 'mobx';
import * as React from 'react';

import { ComponentFactory } from '../models/ComponentFactory';
import { DashboardModel } from '../models/Dashboard';
import { IComponentFactory, IDashboard } from '../types';
import { DashboardContainer } from './dashboard';

interface IDashboardWrapperProps {
    className?: string;
    config?: any;
    addApp?: IRequest | ISupplierFunc<IRequest>;
    loader?: () => Promise<any>;
    saver?: (data : any) => Promise<any>;
    saveDelay?: number;
    host?: IEventEmitter;
    router?: IRouter;
    componentFactory?: IComponentFactory;
    afterConfig?: (dashboard : IDashboard) => void;
    //styles?: any
}

interface IDashboardWrapper {
    dashboard : IDashboard;
}

class DashboardWrapper extends React.Component<IDashboardWrapperProps, any> implements IDashboardWrapper {
    @observable.ref private _dashboard : DashboardModel = new DashboardModel();
    
    @computed
    get dashboard() {
        return this._dashboard;
    }
    constructor(props : IDashboardWrapperProps) {
        super(props);
        this._setFromProps(this.props);
    }
    private _setFromProps(props : IDashboardWrapperProps) {
        this.dashboard.router = props.router;
        this.dashboard.addApp = props.addApp;
        this.dashboard.loader = props.loader;
        this.dashboard.saver = props.saver;
        this.dashboard.saveDelay = props.saveDelay;
        this.dashboard.componentFactory = props.componentFactory || ComponentFactory;
    }
    private _load(props : IDashboardWrapperProps) {
        if(props.loader) {
            this.dashboard.load();
        } else if(props.config) {
            this.dashboard.setConfig(props.config);
            if(props.afterConfig) {
                props.afterConfig(this.dashboard);
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        this.dashboard.close();
        this._setFromProps(nextProps);
        this._load(nextProps);
    }
    componentWillMount() {
        this._load(this.props);
    }
    componentWillUnmount() {
        this.dashboard.close();
    }
    render() {
        return (
            <DashboardContainer
                className={this.props.className}
                dashboard={this.dashboard}
                host={this.props.host}
            />
        )
    }
}

export { IDashboardWrapper, IDashboardWrapperProps, DashboardWrapper }