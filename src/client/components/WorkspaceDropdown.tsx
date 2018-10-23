import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Divider from '@material-ui/core/Divider';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { withStyles } from '@material-ui/core/styles';
import TrashIcon from '@material-ui/icons/Delete';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import AddIcon from '@material-ui/icons/LibraryAdd';
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

class _WorkspaceDropdown extends React.Component<any, any> {
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
            Workspaces
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
                    <ListSubheader>Active</ListSubheader>
                      
                      <MenuItem 
                        onClick={this.handleClose}
                      >
            <Checkbox
                checked={false}
                tabIndex={-1}
                disableRipple
              />
                      <ListItemText primary="UntitledWorkspace1"/>

                      <IconButton aria-label="Delete">
                        <TrashIcon />
                      </IconButton>
                  
                      </MenuItem>
                      <Divider inset />

<ListSubheader>New</ListSubheader>

                      <MenuItem onClick={this.handleClose}>
                      <AddIcon/>
                       <ListItemText primary="Blank"/>
                      </MenuItem>

                      <MenuItem onClick={this.handleClose}>
                      <AddIcon/>
                       <ListItemText primary="From Template"/>
                      </MenuItem>

                      <MenuItem onClick={this.handleClose}>
                      <AddIcon/>
                       <ListItemText primary="From Existing"/>
                      </MenuItem>

<Divider inset />

<ListSubheader>Delete</ListSubheader>

                      <MenuItem onClick={this.handleClose}>
                        <DeleteSweepIcon/>
                       <ListItemText primary="Remove All Workspaces"/>
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


export let WorkspaceDropdown =  withStyles(styles)(_WorkspaceDropdown);
export default WorkspaceDropdown