import { IAppHostModel, IAppProps } from '@coglite/apphost';
import * as React from 'react';

import { IUserProfile } from '../../user/types';

class PortalAppBase extends React.Component<IAppProps, any> {
    get host() : IAppHostModel {
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