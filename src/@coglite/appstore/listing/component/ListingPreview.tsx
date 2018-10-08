import { observer } from 'mobx-react';
import { Icon } from 'office-ui-fabric-react';
import { Image } from 'office-ui-fabric-react';
import * as React from 'react';

import { IListing } from '../IListing';
import { getClassNames, IListingPreviewClassNames } from './ListingPreview.classNames';
import { getStyles, IListingPreviewStyles } from './ListingPreview.styles';


interface IListingPreviewProps {
    listing: IListing;
    styles?: IListingPreviewStyles;
    className?: string;
}

@observer
class ListingPreview extends React.Component<IListingPreviewProps, any> {
    private _classNames : IListingPreviewClassNames;
    private _renderFallback() {
        return <div className={this._classNames.fallback}><Icon className={this._classNames.fallbackIcon} iconName="Puzzle" /></div>;
    }
    render() {
        this._classNames = getClassNames(getStyles(undefined, this.props.styles), this.props.className);
        let fallback;
        let image;
        if(this.props.listing.banner_icon && this.props.listing.banner_icon.url) {
            image = <Image src={this.props.listing.banner_icon.url} alt={this.props.listing.title} width={220} height={137} />
        } else {
            image = this._renderFallback();
        }
        return (
            <div className={this._classNames.root}>
                {image}
            </div>
        );
    }
}

export { IListingPreviewProps, ListingPreview }