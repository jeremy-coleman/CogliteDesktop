import { ContextualMenuItemType, IContextualMenuItem } from 'office-ui-fabric-react';
import * as React from 'react';

import { IUserProfile } from '../types';
import { UserGroups, UserInfo } from './UserProfile';




const createUserProfileMenu = (userProfile : IUserProfile) : IContextualMenuItem => {
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