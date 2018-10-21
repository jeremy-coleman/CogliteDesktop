import { HostAppView, IAppHostModel, IAppProps } from '@coglite/apphost';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import * as React from 'react';

import {observer} from 'mobx-react'

import {compose} from 'recompose'

class AxiosTestAppRoot extends React.Component<IAppProps, any> {
    
    get host() : IAppHostModel {
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

export let AxiosTestApp = compose(observer(AxiosTestAppRoot))

export default AxiosTestApp