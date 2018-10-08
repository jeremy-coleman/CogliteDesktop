import * as React from "react";
import { IAppHostProps, AppHostContainer ,AppHost, IAppHost  } from "./host";
import { IRequest, IRouter } from "@coglite/router";
import { IAppLauncher } from "./launcher";



interface IAppContainerBaseProps {
    router?: IRouter;
    launcher?: IAppLauncher;
    root?: boolean;
    onRenderSync?: (props : IAppHostProps) => React.ReactNode;
    onRenderError?: (host : IAppHostProps) => React.ReactNode;
}

interface IAppContainerProps extends IRequest, IAppContainerBaseProps {}

interface IAppContainer {
    host: IAppHost;
}

class AppContainer extends React.Component<IAppContainerProps, any> implements IAppContainer {
    protected _host : AppHost;
    constructor(props : IAppContainerProps) {
        super(props);
        this._host = new AppHost();
        this._host.setRoot(this.props.root ? true : false);
        this._host.router = this.props.router;
        this._host.launcher = this.props.launcher;
        this._host.setDefaultRequest(props);
    }
    get host() : IAppHost {
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
            <AppHostContainer host={this._host}
                              onRenderSync={this.props.onRenderSync}
                              onRenderError={this.props.onRenderError} />
        );
    }
}

export {
    IAppContainerBaseProps,
    IAppContainerProps,
    IAppContainer,
    AppContainer
}