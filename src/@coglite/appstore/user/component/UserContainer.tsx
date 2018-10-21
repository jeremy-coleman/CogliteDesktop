import { SyncComponent } from '@coglite/apphost';
import * as React from 'react';

import { UserProfileStore } from '../model/UserProfileStore';
import { IUserProfile } from '../types';

interface IUserContainerProps {
    onRenderUser?: (userProfile : IUserProfile) => React.ReactNode;
    onRenderLoadingUserProfile?: () => React.ReactNode;
    onRenderLoadError?: () => React.ReactNode;
}
// Basic container for components that request a user profile before rendering
class UserContainer extends React.Component<IUserContainerProps, any> {
    componentWillMount() {
        UserProfileStore.load();
    }
    private _onRenderDone = () => {
        return this.props.onRenderUser ? this.props.onRenderUser(UserProfileStore.value) : this.props.children;
    }
    render() {
        return <SyncComponent sync={UserProfileStore.sync}
                              onRenderDone={this._onRenderDone}
                              onRenderSync={this.props.onRenderLoadingUserProfile}
                              onRenderError={this.props.onRenderLoadError} />;
    }
}

export { IUserContainerProps, UserContainer }