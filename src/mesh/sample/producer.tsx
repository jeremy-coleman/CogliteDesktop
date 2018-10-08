import { HostAppView } from '@coglite/apphost';
import { IAppProps } from '@coglite/apphost';
import * as React from 'react';

import Button from '@material-ui/core/Button'

class ProducerApp extends React.Component<IAppProps, any> {
    get host() {
        return this.props.match.host;
    }
    componentDidMount() {
        if(window.parent) {
            window.parent.postMessage({ type: "subscribe", path: this.props.match.path }, "*");
        }
    }
    componentWillUnmount() {
        if(window.parent) {
            window.parent.postMessage({ type: "unmount", path: this.props.match.path }, "*");
        }
    }
    private _onClick = () => {
        if(window.parent) {
            window.parent.postMessage({ type: "info", path: this.props.match.path, appConfig: AppConfig }, "*");
        }
    }
    render() {
        return (
            <HostAppView host={this.host}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 10 }}>
                    <Button color='primary' variant='contained' onClick={this._onClick}>Post Message</Button>
                </div>
            </HostAppView>
        );
    }
}

export { ProducerApp, ProducerApp as default }