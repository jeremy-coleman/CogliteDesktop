import * as React from "react";
import { IHostAppViewProps, HostAppView } from "@coglite/apphost";
import { IContextualMenuItem } from "office-ui-fabric-react";
import { observer } from "mobx-react";
import { createUserProfileMenu } from "../../user/component/UserProfileMenuHelper";
import { IUserProfile } from "../../user/IUserProfile";

interface IPortalAppViewProps extends IHostAppViewProps {
    userProfile?: IUserProfile;
}

@observer
class PortalAppView extends React.Component<IPortalAppViewProps, any> {
    render() {
        const farItems : IContextualMenuItem[] = [];
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