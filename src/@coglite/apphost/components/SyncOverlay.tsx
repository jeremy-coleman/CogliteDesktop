import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { observer } from 'mobx-react';
import * as React from 'react';

import { ISyncModel } from '../types';


const syncSpinnerOverlayStyle: React.CSSProperties = {
            display: "flex",
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: "center",
            zIndex: 30000
        
}

interface ISyncOverlayProps {
    sync: ISyncModel;
    syncLabel?: string;
    onRenderSync?: (props : ISyncOverlayProps) => React.ReactNode;
    onRenderError?: (props : ISyncOverlayProps) => React.ReactNode;
    //styles?: ISyncOverlayStyles;
    className?: string;
    //overlayProps?: IOverlayProps;
}

const defaultRenderSync = (props) => {
    return (
    <div style={syncSpinnerOverlayStyle}>
    <CircularProgress/>
    <Typography variant='subheading'>{props.syncLabel || "Loading..."}</Typography>
    </div>
    )
};


@observer
class SyncOverlay extends React.Component<ISyncOverlayProps, any> {
    render() {
        const { sync, onRenderSync, onRenderError } = this.props;
        if(sync.syncing || (onRenderError && sync.error)) {
            const content = sync.error ? onRenderError(this.props) : (onRenderSync || defaultRenderSync)(this.props);
            return (
                <div style={{display: 'grid', height: '100vh'}}>
                <span style={{margin: 'auto'}}>
                    {content}
                </span>
                </div>
            );
        }
        return null;
    }
}

export { ISyncOverlayProps, SyncOverlay }