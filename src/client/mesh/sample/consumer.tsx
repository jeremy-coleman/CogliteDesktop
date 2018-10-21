import { HostAppView, IAppProps } from '@coglite/apphost';
import Button from '@material-ui/core/Button';
import * as React from 'react';

interface IConsumerAppState {
    messages: any[];
}

class ConsumerApp extends React.Component<IAppProps, IConsumerAppState> {
    constructor(props) {
        super(props);
        this.state = { messages: [] }
    }
    get host() {
        return this.props.match.host;
    }
    private _onMessage = (evt : MessageEvent) => {
        if(evt.source !== window) {
            const messages = this.state.messages.concat(evt.data);
            this.setState({ messages: messages });
        }
    }
    private _onClickClear = () => {
        this.setState({ messages: [] });
    }
    componentDidMount() {
        this.host.addEventListener("message", this._onMessage);
        if(window.parent) {
            window.parent.postMessage({ type: "subscribe", path: this.props.match.path }, "*");
        }
    }
    componentWillUnmount() {
        if(window.parent) {
            window.parent.postMessage({ type: "unsubscribe", path: this.props.match.path }, "*");
        }
        this.host.removeEventListener("message", this._onMessage);
    }
    render() {
        return (
            <HostAppView host={this.host}>
                {this.state.messages.map((msg, idx) => {
                    return (
                        <div key={idx}>
                            <pre>
                                {JSON.stringify(msg, null, "\t")}
                            </pre>
                        </div>
                    )
                })}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 10 }}>
                    <Button variant='raised' color='primary' onClick={this._onClickClear} disabled={this.state.messages.length === 0}>Clear</Button>
                </div>
            </HostAppView>
        );
    }
}

export { ConsumerApp, ConsumerApp as default }