import { memoizeFunction, mergeStyleSets } from 'office-ui-fabric-react';

import { IUserListingsStyles } from './UserListings.styles';

interface IUserListingsClassNames {
    root?: string;
    list?: string;
    listCell?: string;
}

const getClassNames = memoizeFunction((styles : IUserListingsStyles, className : string) : IUserListingsClassNames => {
    return mergeStyleSets({
        root: ["user-listings", styles.root, className],
        list: ["user-listings-list", styles.list],
        listCell: ["user-listings-list-cell", styles.listCell]
    })
});

export { IUserListingsClassNames, getClassNames }