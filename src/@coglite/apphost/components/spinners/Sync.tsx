import { observer } from 'mobx-react';
//import { Spinner } from 'office-ui-fabric-react';
import * as React from 'react';

import { ISyncModel } from '../../types';
import { Error } from '../error';
//import { getClassNames, ISyncClassNames } from './Sync.classNames';
//import { getStyles, ISyncStyles } from './Sync.styles';

import CircularProgress from '@material-ui/core/CircularProgress'

let spinnerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 8
}

interface ISyncProps {
    sync: ISyncModel;
    onRenderDone?: (props : ISyncProps) => React.ReactNode;
    syncLabel?: string;
    onRenderDefault?: (props : ISyncProps) => React.ReactNode;
    onRenderSync?: (props : ISyncProps) => React.ReactNode;
    onRenderError?: (error : any, props : ISyncProps) => React.ReactNode;
    //styles?: ISyncStyles;
    className?: string;
}

const defaultOnRenderDone = (props : ISyncProps) => {
    return null;
};

class SyncSpinner extends React.Component<ISyncProps, any> {
    render() {
        return (
        <span>
        <CircularProgress className="sync-spinner">
        </CircularProgress>
        {this.props.syncLabel || "Loading..."}
        </span>
        )
    }
}

const defaultOnRenderSync = (props : ISyncProps) => {
    return <SyncSpinner {...props} />;
};

const defaultOnRenderError = (error : any) => {
    return <Error className="sync-error-message" error={error} />;
};

const DefaultSyncProps : ISyncProps = {
    sync: null,
    onRenderDone: defaultOnRenderDone,
    onRenderSync: defaultOnRenderSync,
    onRenderError: defaultOnRenderError
};

@observer
class SyncComponent extends React.Component<ISyncProps, any> {
    //private _classNames : ISyncClassNames;
    private _renderSyncError() : React.ReactNode {
        const error = this.props.sync.error;
        return this.props.onRenderError ?
            this.props.onRenderError(error, this.props) :
            DefaultSyncProps.onRenderError(error, this.props);
    }
    private _renderSyncing() : React.ReactNode {
        const syncContent = this.props.onRenderSync ?
            this.props.onRenderSync(this.props) :
            DefaultSyncProps.onRenderSync(this.props);
        return (
            <div style={spinnerStyles}>
                {syncContent}
            </div>
        );
    }
    render() {
        //this._classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        
        let content;
        const sync = this.props.sync;
        if(sync.syncing) {
            content = this._renderSyncing();
        } else if(sync.error) {
            content = this._renderSyncError();
        } else if(sync.hasSynced) {
            content = this.props.onRenderDone(this.props);
        } else {
            content = this.props.onRenderDefault ? this.props.onRenderDefault(this.props) : null;
        }

        return content;
    }
}

export { ISyncProps, SyncComponent, SyncSpinner, DefaultSyncProps }