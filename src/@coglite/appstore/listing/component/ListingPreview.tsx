import { theme } from '@coglite/apphost';
import { observer } from 'mobx-react';
import { FontSizes, Icon, Image } from 'office-ui-fabric-react';
import * as React from 'react';
import { stylesheet } from 'typestyle';

import { IListing } from '../types';



const listingPreviewStyles = stylesheet({
        root: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 228,
            height: 145
        },
        fallback: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 220,
            height: 137,
            backgroundColor: theme.palette.neutralLight,
            color: theme.palette.themePrimary
        },
        fallbackIcon: {
            fontSize: FontSizes.xxLarge
        }
})



interface IListingPreviewProps {
    listing: IListing;
    //styles?: IListingPreviewStyles;
    className?: string;
}

@observer
class ListingPreview extends React.Component<IListingPreviewProps, any> {
    //private _classNames : IListingPreviewClassNames;
    private _renderFallback() {
        return <div className={listingPreviewStyles.fallback}><Icon className={listingPreviewStyles.fallbackIcon} iconName="Puzzle" /></div>;
    }
    render() {
        let fallback;
        let image;
        if(this.props.listing.banner_icon && this.props.listing.banner_icon.url) {
            image = <Image src={this.props.listing.banner_icon.url} alt={this.props.listing.title} width={220} height={137} />
        } else {
            image = this._renderFallback();
        }
        return (
            <div className={listingPreviewStyles.root}>
                {image}
            </div>
        );
    }
}

export { IListingPreviewProps, ListingPreview }