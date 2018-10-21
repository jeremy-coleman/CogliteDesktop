import Avatar from '@material-ui/core/Avatar';
import * as React from 'react';

import { IListing } from '../types';



interface IListingBannerIconProps {
    listing: IListing;
}

class ListingBannerIcon extends React.Component<IListingBannerIconProps, any> {
    render() {
        return (
            <Avatar
                src={this.props.listing.banner_icon ? this.props.listing.banner_icon.url : undefined}
                sizes={'100'}>
            {(this.props.listing.title).substring(0,1)}
            </Avatar>
        )
    }
}

export { IListingBannerIconProps, ListingBannerIcon }