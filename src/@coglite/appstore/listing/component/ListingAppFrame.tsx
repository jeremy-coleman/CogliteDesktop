import { AppFrame, IAppHostBaseProps } from '@coglite/apphost';
import * as React from 'react';

import { IListing } from '../types';


interface IListingAppFrameProps extends IAppHostBaseProps {
    listing: IListing;
}

class ListingAppFrame extends React.Component<IListingAppFrameProps, any> {
    render() {
        return (
            <AppFrame host={this.props.host}
                      src={this.props.listing.launch_url} />
        );
    }
}

export {
    IListingAppFrameProps,
    ListingAppFrame
}