import * as React from "react";
import { IAppHostBaseProps, AppFrame } from "@coglite/apphost";
import { IListing } from "../../listing/IListing";


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