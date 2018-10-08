import * as React from "react";
import { IAppProps,IAppHost} from "@coglite/apphost";
import { IUserProfile } from "../../user/IUserProfile";

class PortalAppBase extends React.Component<IAppProps, any> {
    get host() : IAppHost {
        return this.props.match.host;
    }
    get userProfile() : IUserProfile {
        return this.props.match.userProfile;
    }
    render() {
        return null;
    }
}

export { PortalAppBase }