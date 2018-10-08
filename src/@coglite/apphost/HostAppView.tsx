import * as React from "react";
import { IAppViewProps, AppView, IAppView } from "./view";
import { IAppHostBaseProps } from "./IAppHostBaseProps";
//import { IContextualMenuItem } from "office-ui-fabric-react";
import { observer } from "mobx-react";
import { createBackItem } from "./nav/NavMenuHelper";

interface IHostAppViewProps extends IAppHostBaseProps, IAppViewProps {
    hideBackNavigation?: boolean;
    showBackLabel?: boolean;
    backFallback?: any;
}

/**
 * Host app view wrapper.
 */

@observer
class HostAppView extends React.Component<IHostAppViewProps, any> {
    private _appView: IAppView;
    private _onAppViewRef = (appView : IAppView) => {
        this._appView = appView;
    }
    private _onHostResize = () => {
        if(this._appView) {
            this._appView.remeasure();
        }
    }
    componentDidMount() {
        this.props.host.addEventListener("resize", this._onHostResize);
    }
    componentWillUnmount() {
        this.props.host.removeEventListener("resize", this._onHostResize);
    }
    render() {
        const myCommandBarItems : any[] = [];
        if(!this.props.hideBackNavigation) {
            const backItem = createBackItem(this.props.host, this.props.backFallback, this.props.showBackLabel);
            if(backItem) {
                myCommandBarItems.push(backItem);
            }
        }
        const commandBarProps = Object.assign({}, this.props.commandBarProps);
        commandBarProps.items = commandBarProps.items ? myCommandBarItems.concat(commandBarProps.items) : myCommandBarItems;
        return (
            <AppView {...this.props} root={this.props.host.root} commandBarProps={commandBarProps} ref={this._onAppViewRef}>
                {this.props.children}
            </AppView>
        );
    }
}

export { IHostAppViewProps, HostAppView }