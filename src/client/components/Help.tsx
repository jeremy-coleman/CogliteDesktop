import { IAppProps } from '@coglite/apphost';
import * as React from 'react';
import {observer} from 'mobx-react'

export let HelpApp = observer((props: IAppProps) => {
    props.match.host.setTitle("Coglite help");
        return (
            <div><p>
                <strong>Coglite</strong> provides a customisable workspace 
                featuring a range of apps that can be added or removed according to your needs.
            </p></div>
        )
})

export default HelpApp
