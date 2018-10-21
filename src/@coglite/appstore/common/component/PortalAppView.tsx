import { HostAppView, IHostAppViewProps } from '@coglite/apphost';
import { observer } from 'mobx-react';
import * as React from 'react';

import { createUserProfileMenu } from '../../user/component/UserProfileMenuHelper';
import { IUserProfile } from '../../user/types';


interface IPortalAppViewProps extends IHostAppViewProps {
    userProfile?: IUserProfile;
}


@observer
class PortalAppView extends React.Component<IPortalAppViewProps, any> {
    render() {
        const farItems : any[] = [];
        if(this.props.host.root && this.props.userProfile) {
            farItems.push(createUserProfileMenu(this.props.userProfile));
        }
        const commandBarProps = Object.assign({}, this.props.commandBarProps);
        commandBarProps.farItems = commandBarProps.farItems ? commandBarProps.farItems.concat(farItems) : farItems;
        return (
            <HostAppView {...this.props} commandBarProps={commandBarProps}>
                {this.props.children}
            </HostAppView>
        );
    }
}

export { PortalAppView, IPortalAppViewProps }