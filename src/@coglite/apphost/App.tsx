import { IRequest, IRouter } from '@coglite/router';
import * as React from 'react';

import { AppHostContainer, AppHostModel, IAppHostProps } from './host';
import { IAppHostModel, IAppLauncher } from './types';



interface IAppContainerBaseProps {
    router?: IRouter;
    launcher?: IAppLauncher;
    root?: boolean;
    onRenderSync?: (props : IAppHostProps) => React.ReactNode;
    onRenderError?: (host : IAppHostProps) => React.ReactNode;
}

interface IAppContainerProps extends IRequest, IAppContainerBaseProps {}

interface IAppContainer {
    host: IAppHostModel;
}

class AppContainer extends React.Component<IAppContainerProps, any> implements IAppContainer {
    protected _host : AppHostModel;
    constructor(props : IAppContainerProps) {
        super(props);
        this._host = new AppHostModel();
        this._host.setRoot(this.props.root ? true : false);
        this._host.router = this.props.router;
        this._host.launcher = this.props.launcher;
        this._host.setDefaultRequest(props);
    }
    get host() : IAppHostModel {
        return this._host;
    }
    componentWillReceiveProps(nextProps : IAppContainerProps) {
        if(nextProps.router !== this.props.router) {
            this._host.setRoot(this.props.root ? true : false);
            this._host.router = nextProps.router;
            this._host.launcher = nextProps.launcher;
        }
        this._host.load(Object.assign({}, nextProps, { replace: true }));
    }
    render() {
        return (
            <AppHostContainer 
                host={this._host}
                onRenderSync={this.props.onRenderSync}
                onRenderError={this.props.onRenderError}
            />
        );
    }
}

export {
    IAppContainerBaseProps,
    IAppContainerProps,
    IAppContainer,
    AppContainer
}