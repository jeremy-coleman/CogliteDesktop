import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { withStyles } from '@material-ui/core/styles';
import TabIcon from '@material-ui/icons/Tab';
import HSplitIcon from '@material-ui/icons/ViewAgenda';
import VSplitIcon from '@material-ui/icons/ViewColumn';
import GridIcon from '@material-ui/icons/ViewQuilt';
import * as React from 'react';

import ExpandMore from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
    margin: 0
  },
});

class _LayoutDropdown extends React.Component<any, any> {
  state = {
    open: false,
  };

  handleToggle = () => this.setState(state => ({ open: !state.open }));
  

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    else this.setState({ open: false });
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
            Layout
          <ExpandMore/>
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
                    <ListSubheader>Workspace Layout</ListSubheader>
                      
          <MenuItem onClick={this.handleClose}>
          <Checkbox checked={false} tabIndex={-1} disableRipple/>
          <TabIcon/>
          <ListItemText primary="Tabs"/>
          </MenuItem>

          <MenuItem onClick={this.handleClose}>
          <Checkbox checked={false} tabIndex={-1} disableRipple/>
          <HSplitIcon/>
          <ListItemText primary="2 Panes"/>
          </MenuItem>


          <MenuItem onClick={this.handleClose}>
          <Checkbox checked={false} tabIndex={-1} disableRipple/>
          <VSplitIcon/>
          <ListItemText primary="3 Panes"/>
          </MenuItem>

          <MenuItem onClick={this.handleClose}>
          <Checkbox checked={false} tabIndex={-1} disableRipple/>
          <GridIcon/>
          <ListItemText primary="Grid"/>
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


export let LayoutDropdown =  withStyles(styles)(_LayoutDropdown);
export default LayoutDropdown