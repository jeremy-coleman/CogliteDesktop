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

//import 
const MyButton = styled(Button)(({theme}) => ({
        borderRadius: 1,
        color: theme.palette.primary.themeSecondary,
        backgroundColor: theme.palette.themePrimary,
        padding: '1px 1px',
        width: '100%'
}))

const CmdBarDimensions = styled(Button)(({theme}) => ({
        borderRadius: 1,
        color: theme.palette.primary.themeSecondary,
        backgroundColor: theme.palette.themePrimary,
        padding: '1px 1px',
        width: '100%'
}))

// function CommandBarTester(props) {
//     return (
//     <ul style={{listStyleType: 'none'}}>
//     <li style={{float: 'left', left: 0}}>
//     {...props.items}
//     </li>
//     <li style={{float: 'right'}}>
//     {...props.farItems}
//     </li>
//     </ul>
// )}

// import {observable} from 'mobx'

// const mousePoint =  ({x: 0, y: 0})

// document.addEventListener("mousemove", function(event) {
//   mousePoint.set({x: event.clientX, y: event.clientY })
// });


const EmbeddedApp = class extends React.Component<IAppProps, any> {


    get host() : IAppHostModel {
        return this.props.match.host;
    }
    get userProfile() : IUserProfile {
        return this.props.match.userProfile;
    }
    render() {
        //@ts-ignore
        //const {theme} = this.props.theme
        const animals = ['dog','cat'];
        return (
        <div>
            <AppBar color='primary' position='relative'>
            <Toolbar variant='dense'>

            <Button color='secondary'>Dashboard<ExpandMore/></Button>
            <Button color='secondary'>Layout<ExpandMore/></Button>
            <Button color='secondary'><Apps/></Button>
            <Button color='secondary'><Help/><ExpandMore/></Button>
            <Button
            variant='text' color='secondary' component='span'><PermIdentity/><ExpandMore/></Button>
            </Toolbar>
            </AppBar>
        
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