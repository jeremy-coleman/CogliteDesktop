import * as React from "react";
import { IListing } from "../IListing";
import { Persona, PersonaSize } from "office-ui-fabric-react";

interface IListingBannerIconProps {
    listing: IListing;
}

class ListingBannerIcon extends React.Component<IListingBannerIconProps, any> {
    render() {
        return (
            <Persona hidePersonaDetails
                         text={this.props.listing.title}
                         imageUrl={this.props.listing.banner_icon ? this.props.listing.banner_icon.url : undefined}
                         size={PersonaSize.extraLarge} />
        )
    }
}

export { IListingBannerIconProps, ListingBannerIcon }