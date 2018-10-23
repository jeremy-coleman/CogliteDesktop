import Button from '@material-ui/core/Button';
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

import SettingsIcon from '@material-ui/icons/Settings';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
    margin: 0
  },
});

class _InfoDropdown extends React.Component<any, any> {
  state = {
    open: false,
  };

  handleToggle = () => this.setState(state => ({ open: !state.open }));
  

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
      //return this.setState({ open: false });
    }
     this.setState({ open: false });
  };
  
  
  anchorEl: any;

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <div>
          <Button
            buttonRef={node => this.anchorEl = node}
            aria-owns={open ? 'menu-list-grow' : null}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
            <SettingsIcon/>
            <ExpandMoreIcon/>
          </Button>
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                //@ts-ignore
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                    <ListSubheader>Information</ListSubheader>
                      
          <MenuItem onClick={this.handleClose && this.props.onClickHelp}>
              <LiveHelpIcon/>
              <ListItemText primary="Help"/>
          </MenuItem>

        <MenuItem onClick={this.handleClose && this.props.onClickAbout}>
            <BuildIcon/>
            <ListItemText primary="About"/>
        </MenuItem>

                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  }
}


export let InfoDropdown =  withStyles(styles)(_InfoDropdown);
export default InfoDropdown