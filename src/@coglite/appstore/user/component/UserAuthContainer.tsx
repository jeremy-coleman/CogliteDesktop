import * as React from 'react';

import { IUserProfile } from '../IUserProfile';
import { UserProfileStore } from '../model/UserProfileStore';
import { UserAdminContext } from '../UserAdminContext';
import { IUserContainerProps, UserContainer } from './UserContainer';

interface IUserAuthContainerProps extends IUserContainerProps {
    isAuthorised: (userProfile : IUserProfile) => boolean;
    onRenderNotAuthorised?: (userProfile : IUserProfile) => React.ReactNode;
}

class UserAuthContainer extends React.Component<IUserAuthContainerProps, any> {
    componentWillMount() {
        UserProfileStore.load();
    }
    private _onRenderUser = (userProfile : IUserProfile) => {
        if(this.props.isAuthorised(userProfile)) {
            return this.props.onRenderUser ? this.props.onRenderUser(userProfile) : this.props.children;
        }
        return this.props.onRenderNotAuthorised ? this.props.onRenderNotAuthorised(userProfile) : null;
    }
    render() {
        return <UserContainer {...this.props} onRenderUser={this._onRenderUser} />;
    }
}

interface IUserAdminContainerProps extends IUserContainerProps {
    onRenderNonAdmin?: (userProfile : IUserProfile) => React.ReactNode;
}

class UserAdminContainer extends React.Component<IUserAdminContainerProps, any> {
    render() {
        return (
            <UserAuthContainer
                    {...this.props}
                    isAuthorised={UserAdminContext.value}
                    onRenderNotAuthorised={this.props.onRenderNonAdmin}>
                {this.props.children}
            </UserAuthContainer>
        );
    }
}

export {
    IUserAuthContainerProps,
    UserAuthContainer,
    IUserAdminContainerProps,
    UserAdminContainer
}