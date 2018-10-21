import { HostAppView, IAppHostModel, IError } from '@coglite/apphost';
import { IRequest } from '@coglite/router';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react';
import * as React from 'react';

import { AppstorePathsContext } from '../PathsContext';
import { IUserProfile } from '../user/types/IUserProfile';
import { ListingAppFrame } from './component';
import { ListingApprovalStatus } from './constants';
import { canUserAccess, isExternalListing } from './ListingHelper';
import { ListingServiceContext } from './service/ListingServiceContext';
import { IListing, IListingService } from './types';

interface ILaunchOptions {
    listingId: string | number;
    userProfile: IUserProfile;
    host: IAppHostModel;
    noReplace?: boolean;
    openNew?: boolean;
}

const validateLaunch = (listing : IListing, userProfile : IUserProfile, errors: IError[], service : IListingService = ListingServiceContext.value) => {
    if(!listing.is_enabled) {
        errors.push({
            code: "DISABLED",
            message: `${listing.title} is disabled`
        });
    }
    if(listing.is_deleted) {
        errors.push({
            code: "DELETED",
            message: `${listing.title} has been deleted`
        })
    }
    if(listing.approval_status !== ListingApprovalStatus.APPROVED) {
        errors.push({
            code: "NOT_APPROVED",
            message: `${listing.title}has not been approved for use`
        });
    }

    if(!listing.launch_url) {
        errors.push({
            code: "NO_URL",
            message: `A URL is not configured for${listing.title}`
        });
    }

    if(!canUserAccess(listing, userProfile)) {
        errors.push({
            code: "FORBIDDEN",
            message: `You don't have access to ${listing.title}`
        });
    }
};

const getValidatedLaunchListing = (opts : ILaunchOptions, service : IListingService = ListingServiceContext.value) : Promise<IListing> => {
    const { host, listingId, userProfile } = opts;
    const validated : IListing = host.state.launchValidatedListing;
    if(validated && String(validated.id) === String(listingId)) {
        // clear the validated listing state
        host.setState({ launchValidatedListing: null });
        return Promise.resolve(validated);
    }
    return service.getListing({ listingId: listingId }).then(app => {
        const errors : IError[] = [];
        validateLaunch(app, userProfile, errors);
        if(errors.length > 0) {
            return Promise.reject({ errors: errors });
        }
        return Promise.resolve(app);
    });
};

const launch = (opts : ILaunchOptions, service : IListingService = ListingServiceContext.value) : Promise<any> => {
    const { host, noReplace, openNew } = opts;
    return getValidatedLaunchListing(opts, service).then(app => {
        if(isExternalListing(app) && !app.iframe_compatible) {
            openAppWindow(app);
        } else {
            host.setState({
                launchValidatedListing: app 
            });
            if(openNew) {
                return host.open({ path: AppstorePathsContext.value.listingLaunch(app.id) });
            }
            return host.load({ path: AppstorePathsContext.value.listingLaunch(app.id), replace: !host.root && !noReplace });
        }
    });
}

const openAppWindow = (app : IListing) => {
    window.open(app.launch_url);
}

const launchHandler = (request : IRequest) => {
    const host = request.host as IAppHostModel;
    const userProfile = request.userProfile as IUserProfile;
    const listingId = request.params.listingId;
    if(!listingId) {
        throw { code: "INVALID_PARAMETER", key: "listingId", message: "A listing id must be specified" };
    }
    return getValidatedLaunchListing({ host: host, userProfile: userProfile, listingId: listingId }).then(app => {
        host.title = app.title;
        if(isExternalListing(app)) {
            if(app.iframe_compatible) {
                return (
                    <HostAppView host={host}>
                        <ListingAppFrame listing={app} host={host} />
                    </HostAppView>
                );
            }
            openAppWindow(app);
            return (
                <HostAppView host={host} hideBackNavigation>
                    <MessageBar messageBarType={MessageBarType.info}>
                        <strong>{app.title}</strong> has been opened in a new Browser Window, as it does not support IFrames.
                    </MessageBar>
                </HostAppView>
            );
        }

        return host.load({ path: app.launch_url, replace: true, noUpdate: true });
    }).catch(err => {
        console.log("-- Launch Error: " + JSON.stringify(err));
        host.title === "Error";
        const errors = err.errors ? err.errors : [err.message];
        return (
            <HostAppView host={host}>
                <MessageBar messageBarType={MessageBarType.blocked}>
                    {errors.map((e, idx) => <div key={idx}>{e.message}</div>)}
                </MessageBar>
            </HostAppView>
        );
    });
};


export { launch, launchHandler, validateLaunch }