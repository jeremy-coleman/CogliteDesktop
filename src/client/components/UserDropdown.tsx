
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { withStyles } from '@material-ui/core/styles';
import BuildIcon from '@material-ui/icons/Build';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';


import * as React from 'react';

import { IUserProfile ,UserGroups, UserInfo  } from '@coglite/appstore';

import {observer} from 'mobx-react'
import {observable} from 'mobx'

import Button from '@material-ui/core/Button';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PermIdentity from '@material-ui/icons/PermIdentity';
import Divider from '@material-ui/core/Divider';


let UserDropdownButton = observer((props) => 
    <Button
        id='user-profile-dropdown-button'
        buttonRef={() => document.getElementById('user-profile-dropdown-button')}
        key="userProfileMenu"
        aria-label={"User Profile for " + props.userProfile.display_name}
        variant='text'
        color='secondary'
        component='span'>
    <PermIdentity/>
    <ExpandMore/>
    </Button>
)

let UserInfoKeyed = observer((props) => 
    <UserInfo key={props.item.key} userProfile={props.userProfile} />
);

let UserGroupsKeyed = observer((props) => 
    <UserGroups
        key={props.item.key}
        userProfile={props.userProfile}
     />
);


let MenuPopper = observer((props) => {
const self = document.getElementById('menu-popper-container')
const parent = self.parentNode as any

return(
      <Popper 
        open={props.open}
        anchorEl={parent}
        transition disablePortal id='menu-popper-container'>
          {({ TransitionProps, placement }) => (
              <Grow {...TransitionProps}
                //@ts-ignore
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={props.onClickAway}>
                    {props.children}
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
    )
})

const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
    margin: 0
  },
});

// interface thing {
// x: React.Parent
// }

export let UserDropdownTest = observer((props) =>
<React.Fragment>
    <UserDropdownButton/>
    <MenuPopper>
    <MenuList>
      <UserInfoKeyed/>
      <ListSubheader>Groups</ListSubheader>
      <UserGroupsKeyed/>
    </MenuList>
    </MenuPopper>
  </React.Fragment>
)




// class _UserProfileDropdown extends React.Component<any, any> {
//   state = {
//     open: false,
//   };

//   handleToggle = () => this.setState(state => ({ open: !state.open }));
  

//   handleClose = event => {
//     if (this.anchorEl.contains(event.target)) {
//       return;
//     }
//     else this.setState({ open: false });
//   };
  
//   anchorEl: any;

//   render() {
//     const { classes } = this.props;
//     const { open } = this.state;

//     return (
//       <div className={classes.root}>
//         <div>
//           <Button
//             buttonRef={node => this.anchorEl = node}
//             aria-owns={open ? 'menu-list-grow' : null}
//             aria-haspopup="true"
//             onClick={this.handleToggle}
//             key="userProfileMenu"
//             aria-label={"User Profile for " + this.props.userProfile.display_name}
//             variant='text'
//             color='secondary'
//             component='span'>
//           <PermIdentity/>
//           <ExpandMore/>
//           </Button>
//           <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
//             {({ TransitionProps, placement }) => (
//               <Grow
//                 {...TransitionProps}
//                 //@ts-ignore
//                 id="menu-list-grow"
//                 style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
//               >
//                 <Paper>
//                   <ClickAwayListener onClickAway={this.handleClose}>
//                     <MenuList>
//                     <ListSubheader>Groups</ListSubheader>
//                     <Divider/>
//                     <UserGroups
//                                 key={this.props.item.key}
//                                 userProfile={this.props.userProfile}
//                             />                      

//                     </MenuList>
//                   </ClickAwayListener>
//                 </Paper>
//               </Grow>
//             )}
//           </Popper>
//         </div>
//       </div>
//     );
//   }
// }


// export let UserProfileDropdown =  withStyles(styles)(observer((_UserProfileDropdown)));
// export default UserProfileDropdown