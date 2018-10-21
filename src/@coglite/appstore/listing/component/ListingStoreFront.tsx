import { ISyncSupplier, SyncComponent, theme } from '@coglite/apphost';
import { observer } from 'mobx-react';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react';
import * as React from 'react';
import { stylesheet } from 'typestyle';

import { IListing, IListingStoreFront } from '../types';
import { ListingList } from './ListingList';
import { ListingTile } from './ListingTile';



let storefrontStyles = stylesheet({
            root: {
            
        },
        header: {
            paddingTop: 8,
            paddingBottom: 0,
            paddingLeft: 16,
            paddingRight: 16
        },
        searchInputContainer: {
            backgroundColor: theme.palette.white
    
        },
        body: {

        },
        section: {
            marginTop: 16
        },
        sectionHeader: {
            marginLeft: 16
        },
        sectionTitle: Object.assign({}, theme.fonts.large, {
            fontWeight: 500
        }),
        sectionBody: {
            
        }
})


interface IListingStoreFrontProps {
    storeFront: ISyncSupplier<IListingStoreFront>;
    onSelectItem?: (listing : IListing) => void;
    onOpen?: (listing : IListing) => void;
    onAdd?: () => void;
    onShowAllListings?: () => void;
    className?: string;
    adminGroup?: string;
}

interface IListingStoreFrontSectionProps {
    title: any;
}

@observer
class ListingStoreFrontSection extends React.Component<IListingStoreFrontSectionProps, any> {
    render() {
        return (
            <div className={storefrontStyles.section}>
                <div className={storefrontStyles.sectionHeader}>
                    <div className={storefrontStyles.sectionTitle}>{this.props.title}</div>
                </div>
                <div className={storefrontStyles.sectionBody}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

interface IListingStoreFrontListSectionProps extends IListingStoreFrontProps, IListingStoreFrontSectionProps {
    listKey: string;
}

class ListingStoreFrontListSection extends React.Component<IListingStoreFrontListSectionProps, any> {
    private _onRenderItem = (listing, idx, props) => {
        return <ListingTile key={listing.id}
                                      listing={listing}
                                      onClick={props.onSelectItem}
                                      onLaunch={this.props.onOpen} />;
    }
    private _onRenderDone = () => {
        const list = this.props.storeFront.value ? this.props.storeFront.value[this.props.listKey] : undefined;
        if(list && list.length > 0) {
            return <ListingList compact wrapping listings={list} onSelectItem={this.props.onSelectItem} onRenderListing={this._onRenderItem} />;
        }
        return <MessageBar messageBarType={MessageBarType.info}>No {this.props.title} Listings available</MessageBar>;
    }
    render() {
        return (
            <ListingStoreFrontSection
                title={this.props.title}>
                <SyncComponent sync={this.props.storeFront.sync} onRenderDone={this._onRenderDone} syncLabel={`Loading ${this.props.title} Listings...`} />
            </ListingStoreFrontSection>
        );
    }
}

class ListingStoreFrontFeaturedSection extends React.Component<IListingStoreFrontProps, any> {
    render() {
        return (
            <ListingStoreFrontListSection {...this.props} listKey="featured" title="Featured" />
        );
    }
}

class ListingStoreFrontMostPopularSection extends React.Component<IListingStoreFrontProps, any> {
    render() {
        return (
            <ListingStoreFrontListSection {...this.props} listKey="most_popular" title="Most Popular" />
        );
    }
}

class ListingStoreFrontRecommendedSection extends React.Component<IListingStoreFrontProps, any> {
    render() {
        return (
            <ListingStoreFrontListSection {...this.props} listKey="recommended" title="Recommended" />
        );
    }
}

class ListingStoreFrontRecentSection extends React.Component<IListingStoreFrontProps, any> {
    render() {
        return (
            <ListingStoreFrontListSection {...this.props} listKey="recent" title="Recent" />
        );
    }
}

class ListingStoreFront extends React.Component<IListingStoreFrontProps, any> {
    render() {
        return (
            <div className={storefrontStyles.root}>
                <ListingStoreFrontFeaturedSection {...this.props} />
                <ListingStoreFrontMostPopularSection {...this.props} />
                <ListingStoreFrontRecommendedSection {...this.props} />
                <ListingStoreFrontRecentSection {...this.props} />
            </div>
        );
    }
}

class ListingStoreFrontContainer extends React.Component<IListingStoreFrontProps, any> {
    componentWillMount() {
        this.props.storeFront.load();
    }
    private _onRenderDone = () => {
        return <ListingStoreFront {...this.props} />;
    }
    render() {
        return <SyncComponent sync={this.props.storeFront.sync} onRenderDone={this._onRenderDone} />
    }
}

export { IListingStoreFrontProps, ListingStoreFrontContainer, ListingStoreFront }