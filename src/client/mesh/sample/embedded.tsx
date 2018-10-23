import { IAppHostModel, IAppProps } from '@coglite/apphost';
import { IUserProfile } from '@coglite/appstore';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Apps from '@material-ui/icons/Apps';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PermIdentity from '@material-ui/icons/PermIdentity';
import Help from '@material-ui/icons/Settings';
import * as React from 'react';
import styled from 'styled-jss';



import {observable} from 'mobx'

//import 
const MyButton = styled(Button)(({theme}) => ({
        borderRadius: 1,
        color: theme.palette.primary.themeSecondary,
        backgroundColor: theme.palette.themePrimary,
        padding: '1px 1px',
        width: '100%'
}))



function CommandBarTester(props) {
    return (
    <AppBar color='primary' position='relative'>
    <Toolbar variant='dense' disableGutters style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
    <span style={{marginLeft: 0}}>{props.items}</span>
    <span style={{marginRight: 0}}>{props.farItems}</span>
    </Toolbar>
    </AppBar>
)}

let B1 = () => <Button color='secondary'>Dashboard<ExpandMore/></Button>
let B2 = () => <Button color='secondary'>Layout<ExpandMore/></Button>
let B3 = () => <Button color='secondary'><Apps/></Button>
let B4 = () => <Button color='secondary'><Help/><ExpandMore/></Button>
let B5 = () => <Button variant='text' color='secondary' component='span'><PermIdentity/><ExpandMore/></Button>


const EmbeddedApp = class extends React.Component<IAppProps, any> {



    get host() : IAppHostModel {
        return this.props.match.host;
    }
    get userProfile() : IUserProfile {
        return this.props.match.userProfile;
    }
    render() {
        const items = [<B1/>, <B2/>]
        items.push(<B3/>)

        return (
        <div>
        <CommandBarTester
        items={items}
        farItems={[<B4/>,<B5/>]}
        />



        
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