import { theme } from '@coglite/apphost';
import { getNameInitials } from '@coglite/design-system';
import Avatar from '@material-ui/core/Avatar';
import * as React from 'react';
import { stylesheet } from 'typestyle';

import { IGroup, IUserProfile } from '../types';
import { observer } from 'mobx-react';


var userProfileStyles = stylesheet({
        root: {
            minWidth: 300
        },
        userInfo: {
            display: 'flex',
            flexDirection: 'row',
            padding: 8
        },
        userInfoText: {
            display: 'flex',
            flexDirection: 'column',
            padding: 1
        },
        body: {
            borderTop: `1px solid ${theme.palette.neutralLight}`
        },
        groups: {
            padding: 8,
            lineHeight: '16px'
        },
        groupsTitle: {
            fontSize: '16px',
            fontWeight: 500,
            margin: 0,
            paddingTop: 4,
            paddingBottom: 8
        },
        groupList: {
        
        },
        group: {
            backgroundColor: theme.palette.neutralSecondary,
            color: theme.palette.white,
            fontSize: '16px',
            fontWeight: 300,
            padding: 4,
            borderRadius: 4,
            margin: 4,
            textAlign: "center",
            verticalAlign: "middle"
        }
})


interface IUserGroupProps {
    group: IGroup;
    className?: string;
}


 let UserGroup = observer((props: IUserGroupProps) => {
    return(
            <div className={props.className} role="listitem">
                {props.group.name}
            </div>
    )
})


interface IUserProfileProps {
    userProfile: IUserProfile;
    className?: string;
}

//<Persona text={displayName} secondaryText={userProfile.user ? userProfile.user.email : undefined }/>

class UserInfo extends React.Component<IUserProfileProps, any> {
    render() {
        const { userProfile } = this.props;
        const initials = getNameInitials(userProfile.display_name) || 'G'
        if(userProfile) {
            const displayName = userProfile.display_name || "Unknown";
            return (
                <div className={userProfileStyles.userInfo}>
                    <Avatar>
                    {'G'}
                    </Avatar>
                    <span className={userProfileStyles.userInfoText}>
                    <div>{displayName}</div>
                    <div>{userProfile.user ? userProfile.user.email : undefined }</div>
                    </span>
                </div>
            );
        }
        return null;
    }
}



 let UserGroups = observer((props: IUserProfileProps) => {
    const groups = props.userProfile.user.groups;
    
    if(groups && groups.length > 0) {
        return (
            <div className={userProfileStyles.groupList} role="list">
                {groups.map(g => <UserGroup key={g.name} group={g} className={userProfileStyles.group} />)}
            </div>
    )}
    else return null;  
})




class UserProfile extends React.Component<IUserProfileProps, any> {
    private _renderHeader() : React.ReactNode {
        return <UserInfo {...this.props} />
    }
    private _renderGroups() : React.ReactNode {
        return (
            <div className={userProfileStyles.groups}>
                <h5 className={userProfileStyles.groupsTitle}>Groups</h5>
                <UserGroups {...this.props} />
            </div>
        );
    }
    private _renderBody() : React.ReactNode {
        return (
            <div className={userProfileStyles.body}>
                {this._renderGroups()}
            </div>
        );
    }
    render() {
        if(this.props.userProfile) {
            return (
                <div className={userProfileStyles.root}>
                    {this._renderHeader()}
                    {this._renderBody()}
                </div>
            );
        }
        return null;
    }
}

export { IUserProfileProps, UserProfile, UserInfo, UserGroups }