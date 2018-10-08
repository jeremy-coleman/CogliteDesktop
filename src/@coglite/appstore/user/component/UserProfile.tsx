import { Persona } from 'office-ui-fabric-react';
import * as React from 'react';

import { IGroup } from '../IGroup';
import { IUserProfile } from '../IUserProfile';
import { getClassNames, IUserProfileClassNames } from './UserProfile.classNames';
import { getStyles, IUserProfileStyles } from './UserProfile.styles';

interface IUserGroupProps {
    group: IGroup;
    className?: string;
}

class UserGroup extends React.Component<IUserGroupProps, any> {
    render() {
        return (
            <div className={this.props.className} role="listitem">
                {this.props.group.name}
            </div>
        )
    }
}

interface IUserProfileProps {
    userProfile: IUserProfile;
    className?: string;
    styles?: IUserProfileStyles;
}

class UserInfo extends React.Component<IUserProfileProps, any> {
    private _classNames : IUserProfileClassNames;
    render() {
        const { userProfile, styles, className } = this.props;
        if(userProfile) {
            const displayName = userProfile.display_name || "Unknown";
            this._classNames = getClassNames(getStyles(null, styles), className);
            return (
                <div className={this._classNames.userInfo}>
                    <Persona text={displayName} secondaryText={userProfile.user ? userProfile.user.email : undefined }/>
                </div>
            );
        }
        return null;
    }
}

class UserGroups extends React.Component<IUserProfileProps, any> {
    private _classNames : IUserProfileClassNames;
    render() {
        this._classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        const groups = this.props.userProfile.user.groups;
        if(groups && groups.length > 0) {
            return (
                <div className={this._classNames.groupList} role="list">
                    {groups.map(g => <UserGroup key={g.name} group={g} className={this._classNames.group} />)}
                </div>
            );
        }
        return null;
    }
}

class UserProfile extends React.Component<IUserProfileProps, any> {
    private _classNames : IUserProfileClassNames;
    private _renderHeader() : React.ReactNode {
        return <UserInfo {...this.props} />
    }
    private _renderGroups() : React.ReactNode {
        return (
            <div className={this._classNames.groups}>
                <h5 className={this._classNames.groupsTitle}>Groups</h5>
                <UserGroups {...this.props} />
            </div>
        );
    }
    private _renderBody() : React.ReactNode {
        return (
            <div className={this._classNames.body}>
                {this._renderGroups()}
            </div>
        );
    }
    render() {
        if(this.props.userProfile) {
            this._classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
            return (
                <div className={this._classNames.root}>
                    {this._renderHeader()}
                    {this._renderBody()}
                </div>
            );
        }
        return null;
    }
}

export { IUserProfileProps, UserProfile, UserInfo, UserGroups }