import { observer } from 'mobx-react';
import * as React from 'react';

import { IAppHostBaseProps } from './types';
import { createBackItem } from './nav/NavMenuHelper';
import { AppView, IAppViewProps } from './view';


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
            <AppView {...this.props} root={this.props.host.root} commandBarProps={commandBarProps}>
                {this.props.children}
            </AppView>
        );
    }
}

export { IHostAppViewProps, HostAppView }