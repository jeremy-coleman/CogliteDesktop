import { BoundTextField } from '@coglite/apphost';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import CommentIcon from '@material-ui/icons/Comment';
import { observer } from 'mobx-react';
import { Panel, PanelType } from 'office-ui-fabric-react';
import * as React from 'react';
import { stylesheet } from 'typestyle';

import { IDashboard, IDashboardAdd } from '../../types';


// this is the popout drawer that asks for name and from existing


let dashboardAddStyles = stylesheet({
        root: {},
        editor: {
            padding: 8
        },
        actions: {},
        action: {
            marginRight: 8
        }
})

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

@observer
class CheckboxList extends React.Component<any, any> {

    private _onChange = (option) => {
        const dashboard = this.props.add.dashboardList.dashboards.find(db => db.id === option.key);
        this.props.add.setExisting(dashboard);
    }

     _onMakeActiveChange = (e, checked) => {
        this.props.add.setMakeActive(checked);
    } 


  render() {
    
if(this.props.add.dashboardList.dashboardCount > 0) {
    const options : any[] = this.props.add.dashboardList.dashboards.map(db => {
        return  {key: db.id,text: db.title};
    });
    options.unshift({key: "",text: ""})
}

    const { classes } = this.props;

    return (
      <div className={classes.root}>

    <InputLabel htmlFor='dashboard-add-dropdown-select'>Copy Existing Dashboard</InputLabel>

        <List  >
          {
           this.props.add.dashboardList.dashboards.map(dashboard => (
            <ListItem
            
              key={dashboard.id}
              role={undefined}
              dense
              button
              onClick={this._onChange}
              className={classes.listItem}
            >
            <Checkbox
                onChange={this._onMakeActiveChange}
                checked={this.props.add.makeActive}
            />
              <ListItemText primary={`${dashboard.title}`} />
              <ListItemSecondaryAction>
                <IconButton aria-label="Comments">
                  <CommentIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}
let DashboardAddList = withStyles(styles)(CheckboxList);



interface IDashboardPropertyEditorProps {
    dashboard: IDashboard;
}

@observer
class DashboardPropertyEditor extends React.Component<IDashboardPropertyEditorProps, any> {
    render() {
        return (
            <div className="dashboard-property-editor">
                <BoundTextField placeholder="Title" binding={{ target: this.props.dashboard, key: "title", setter: "setTitle" }} />
            </div>
        );
    }
}

interface IDashboardAddActionsProps {
    add: IDashboardAdd;
    className?: string;
    actionClassName?: string;
}

@observer
class DashboardAddActions extends React.Component<IDashboardAddActionsProps, any> {
    private _onClickCancel = () => {
        this.props.add.cancel();
    }
    private _onClickSave = () => {
        this.props.add.save();
    }
    render() {
        return (
            <div className={this.props.className}>
                <Button color='secondary' variant='contained' className={this.props.actionClassName} onClick={this._onClickCancel}>Cancel</Button>
                <Button color='primary' variant='contained' className={this.props.actionClassName} onClick={this._onClickSave} disabled={!this.props.add.saveEnabled}>OK</Button>
            </div>
        );
    }
}


interface IDashboardAddEditorProps {
    add: IDashboardAdd;
    className?: string;
}

@observer
class DashboardAddEditor extends React.Component<IDashboardAddEditorProps, any> {
     _onKeyDown = (e : React.KeyboardEvent<HTMLElement>) => {
        if(e.key === 'enter' && this.props.add.saveEnabled) {
            this.props.add.save();
        }
    }

     _onMakeActiveChange = (e, checked) => {
        this.props.add.setMakeActive(checked);
    } 

    render() {
        if(this.props.add.active) {
            return (
                <div className={this.props.className}>
                    <InputLabel>New Dashboard Name:</InputLabel>
                    <DashboardPropertyEditor dashboard={this.props.add.dashboard} />
                    <DashboardAddList {...this.props}/>
                </div>
            );
        }
        return null;
    }
}


interface IDashboardAddProps {
    add: IDashboardAdd;
    className?: string;
}

@observer
class DashboardAddPanel extends React.Component<IDashboardAddProps, any> {
    private _onRenderActions = () => {
        return <DashboardAddActions add={this.props.add} className={dashboardAddStyles.actions} actionClassName={dashboardAddStyles.action} />;
    }
    private _onRenderEditor = () => {
        return <DashboardAddEditor add={this.props.add} className={dashboardAddStyles.editor} />;
    }
    private _onDismiss = () => {
        this.props.add.cancel();
    }
    render() {
        return (
            <Panel className={dashboardAddStyles.root}
                   isOpen={this.props.add.active}
                   isLightDismiss={true}
                   onRenderFooterContent={this._onRenderActions}
                   onRenderBody={this._onRenderEditor}
                   headerText="Add Dashboard"
                   type={PanelType.medium}
                   onDismiss={this._onDismiss} />
        );
    }
}

export { IDashboardAddProps, DashboardAddPanel }

                    
                    // <Label 
                    //     placeholder="Set Dashboard Active"
                    //     style={{ marginTop: 8 }}
                    //     value={this.props.add.existing ? this.props.add.existing.id : ""} 
                    // >
                    // <MenuList>
                    //     <MenuItem>
                    // <Checkbox
                    //     onChange={this._onMakeActiveChange}
                    //     checked={this.props.add.makeActive}
                    // />
                    // </MenuItem>
                    // </MenuList>
                    // </Select>