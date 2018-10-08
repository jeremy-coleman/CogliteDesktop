import { memoizeFunction, mergeStyleSets } from 'office-ui-fabric-react';

import { IUserProfileStyles } from './UserProfile.styles';

interface IUserProfileClassNames {
    root?: string;
    userInfo?: string;
    body?: string;
    groups?: string;
    groupsTitle?: string;
    groupList?: string;
    group?: string;
}

const getClassNames = memoizeFunction((styles : IUserProfileStyles, className?: string) : IUserProfileClassNames => {
    return mergeStyleSets({
        root: ["user-profile", className, styles.root],
        userInfo: ["user-profile-user-info", styles.userInfo],
        body: ["user-profile-body", styles.body],
        groups: ["user-profile-groups", styles.groups],
        groupsTitle: ["user-profile-groups-title", styles.groupsTitle],
        groupList: ["user-profile-group-list", styles.groupList],
        group: ["user-profile-group", styles.group]
    });
});

export { IUserProfileClassNames, getClassNames }