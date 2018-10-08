import { observer } from 'mobx-react';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react';
import * as React from 'react';

import { IListingModel } from '../model/IListingModel';

interface IListingSaveSyncErrorProps {
    listing: IListingModel;
}

@observer
class ListingSaveSyncError extends React.Component<IListingSaveSyncErrorProps, any> {
    render() {
        const { listing } = this.props;
        if(listing.saveSync.error) {
            const errors = listing.saveSync.error.errors;
            let errorsContent;
            if(errors) {
                errorsContent = (
                    <pre>{JSON.stringify(errors, null, "\t")}</pre>
                );
            }
            return (
                <MessageBar messageBarType={MessageBarType.error}>
                    Unable to save listing - {this.props.listing.saveSync.error.message}
                    {errorsContent}
                </MessageBar>
            );
        }
        return null;
    }
}

export { ListingSaveSyncError, IListingSaveSyncErrorProps }