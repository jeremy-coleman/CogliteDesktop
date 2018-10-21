import { Icon, Image, Spinner, SpinnerSize } from 'office-ui-fabric-react';
import * as React from 'react';

import { IListingModelSupplier } from '../types';

//import when from 'when-switch'

const renderIcon = (listingSupplier : IListingModelSupplier) => {
    let icon;
    if(listingSupplier.sync.syncing) {
        icon = <Spinner size={SpinnerSize.small} />;
    } else if(listingSupplier.sync.error) {
        icon = <Icon iconName="Error" />;
    } else if(listingSupplier.value.small_icon && listingSupplier.value.small_icon.url) {
        icon = <Image src={listingSupplier.value.small_icon.url} width={16} height={16} />;
    } else {
        icon = <Icon iconName="Puzzle" />;
    }
    return icon
};

const renderIcon2 = (listingSupplier : IListingModelSupplier) => {
    let icon;
    if(listingSupplier.sync.syncing) {
        icon = <Spinner size={SpinnerSize.small} />;
    } else if(listingSupplier.sync.error) {
        icon = <Icon iconName="Error" />;
    } else if(listingSupplier.value.small_icon && listingSupplier.value.small_icon.url) {
        icon = <Image src={listingSupplier.value.small_icon.url} width={16} height={16} />;
    } else {
        icon = <Icon iconName="Puzzle" />;
    }
    return icon
};

export {
    renderIcon
}