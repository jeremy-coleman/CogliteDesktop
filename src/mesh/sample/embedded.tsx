import { IUserProfile } from '@coglite/appstore';
import { IAppProps } from '@coglite/apphost';
import { ScriptFrame } from '@coglite/apphost';
import { IAppHost } from '@coglite/apphost';
import * as React from 'react';



import Button from '@material-ui/core/Button'
 import styled from 'styled-jss'

//import 
const MyButton = styled(Button)(({theme}) => ({
        borderRadius: 1,
        color: theme.palette.primary.themeSecondary,
        backgroundColor: theme.palette.themePrimary,
        padding: '1px 1px',
        width: '100%'
}))

const EmbeddedApp = class extends React.Component<IAppProps, any> {

    get host() : IAppHost {
        return this.props.match.host;
    }
    get userProfile() : IUserProfile {
        return this.props.match.userProfile;
    }
    render() {
        //@ts-ignore
        //const {theme} = this.props.theme
        return (
        <div>
        <Button color='primary'>normal</Button>
        <MyButton variant="contained" color="primary" component="span">jss styled</MyButton>
        </div>
        )
    }
}

export { EmbeddedApp, EmbeddedApp as default }

//        <Button className={css().secondaryButton} color="primary" variant='raised'>hi</Button>

        // <ScriptFrame 
        //             host={this.host}
        //             src="http://localhost:8081/coglite/entity/app.js"
        //             config={Object.assign({}, AppConfig, { userProfile: this.userProfile })}
        //         />