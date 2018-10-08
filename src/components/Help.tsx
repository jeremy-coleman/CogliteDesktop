import { IAppProps } from '@coglite/apphost';
import * as React from 'react';

class Help extends React.Component<any, any> {
    render() {
        return (
            <div>
                    <p>
                        <strong>Coglite</strong> provides a customisable workspace featuring a range of apps that can be added or removed according to your needs.
                    </p>
            </div>
        );
    }
}

class HelpApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.match.host.setTitle("Coglite help");
    }
    render() {
        return <Help />;
    }
}

export { HelpApp, HelpApp as default, Help }