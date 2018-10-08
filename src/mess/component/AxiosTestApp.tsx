import { HostAppView } from '@coglite/apphost';
import { IAppProps } from '@coglite/apphost';
import { IAppHost } from '@coglite/apphost';
import axios from 'axios';
import * as React from 'react';

import Button from '@material-ui/core/Button'

class AxiosTestApp extends React.Component<IAppProps, any> {
    get host() : IAppHost {
        return this.props.match.host;
    }
    private _onTest = () => {

     axios.post("http://localhost:8085?mockreq",
        { jsonRPC: {/*todo*/}},
        { auth: {username: "guest",password: "password"}})
        .then(r => {
            console.log(JSON.stringify(r.data));
        }).catch(err => {
            console.error(err);  
        });
    }
    render() {
        return (
            <HostAppView host={this.host}>
                <Button color='primary' onClick={this._onTest}>Test</Button>
            </HostAppView>
        )
    }
}

export { AxiosTestApp as default, AxiosTestApp }