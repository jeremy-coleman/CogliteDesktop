import { ContextualMenuItemType, IContextualMenuItem } from 'office-ui-fabric-react';
import * as React from 'react';

import { IUserProfile } from '../types';
import { UserGroups, UserInfo } from './UserProfile';

import {observer} from 'mobx-react'

import Button from '@material-ui/core/Button';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PermIdentity from '@material-ui/icons/PermIdentity';

let UserDropdownButton = observer((userProfile : IUserProfile) => 
    <Button
        id='user-profile-dropdown-button'
        buttonRef={() => document.getElementById('user-profile-dropdown-button')}
        key="userProfileMenu"
        aria-label={"User Profile for " + userProfile.display_name}
        variant='text'
        color='secondary'
        component='span'>
    <PermIdentity/>
    <ExpandMore/>
    </Button>
)

let UserInfoKeyed = observer((props) => 
    <UserInfo key={props.item.key} userProfile={props.userProfile} />
);

let UserGroupsKeyed = observer((props) => 
    <UserGroups
        key={props.item.key}
        userProfile={props.userProfile}
     />
);
                    


const createUserProfileMenu = (userProfile : IUserProfile) => {
    return {
        key: "userProfileMenu",
        ariaLabel: "User Profile for " + userProfile.display_name,
        iconProps: {
            iconName: "Contact"
        },
        subMenuProps: {
            items: [
                {
                    key: "userInfo",
                    userProfile: userProfile,
                    onRender(item) {
                        return (<UserInfo key={item.key} userProfile={userProfile} />);
                    }
                },
                {
                    key: "userGroupsHeader",
                    itemType: ContextualMenuItemType.Header,
                    name: "Groups"
                },
                {
                    key: "userGroups",
                    onRender(item) {
                        return (
                            <UserGroups
                                key={item.key}
                                userProfile={userProfile}
                            />
                        );
                    }
                }
            ]
        }
    }
};

export {
    createUserProfileMenu
}