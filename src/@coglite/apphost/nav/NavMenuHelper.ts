import { IContextualMenuItem } from 'office-ui-fabric-react';

import { IAppHost } from '../host';

const createBackItem = (host : IAppHost, fallback?: IContextualMenuItem, showLabel?: boolean) : IContextualMenuItem => {
    if(host.canGoBack) {
        const backRequest = host.backRequest;
        const title = backRequest.title ? `Back to ${backRequest.title}` : "Back";
        return {
            key: "back",
            iconProps: {
                iconName: "Back"
            },
            name: showLabel ? title : undefined,
            host: host,
            path: backRequest.path,
            title: title,
            ariaLabel: title,
            onClick: () => {
                host.back();
            }
        };
    }
    return fallback;
};

export { createBackItem }