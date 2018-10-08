import { observer } from 'mobx-react';
import { IconButton } from 'office-ui-fabric-react';
import * as React from 'react';

import { IListing } from '../IListing';

interface IListingLaunchActionProps {
    listing: IListing;
    onLaunch?: (listing : IListing) => void;
}

@observer
class ListingLaunchAction extends React.Component<IListingLaunchActionProps, any> {
    private _onClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        this.props.onLaunch(this.props.listing);
    }
    render() {
        if(this.props.onLaunch) {
            return (
                <IconButton onClick={this._onClick}
                                title={this.props.listing.title ? `Launch ${this.props.listing.title}` : "Launch"}
                                iconProps={{ iconName: "OpenInNewWindow" }} />
            );
        }
        return null;
    }
}

export {
    IListingLaunchActionProps,
    ListingLaunchAction
}