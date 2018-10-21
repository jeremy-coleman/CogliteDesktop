import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { observer } from 'mobx-react';
import * as React from 'react';

import { IComponentRemove } from '../types/IComponentRemove';


interface IComponentRemoveProps {
    remove: IComponentRemove;
}

@observer
class ComponentRemoveDialog extends React.Component<IComponentRemoveProps, any> {
    private _onClickCancel = () => {
        this.props.remove.cancel();
    }
    private _onClickSave = () => {
        this.props.remove.save();
    }
    private _onDismissed = () => {
        this.props.remove.cancel();
    }
    render() {

        const c = this.props.remove.component;
        let title;
        if(c) {
            if(c.type === "stack" || c.type === "list") {
                title = "all Tabs";
            }
        }
        if(!title) {
            title = "the Tab";
        }
    return (
            <Dialog 
                open={!this.props.remove.active? false : true}
                onClose={this._onDismissed}
            >
            <DialogTitle>{`Close ${title}`}</DialogTitle>
            <DialogContentText>{`Are you sure you want to close ${title}?`}</DialogContentText>
            <DialogActions>
                <Button variant='contained' color='secondary' onClick={this._onClickCancel}>Cancel</Button>
                <Button variant='contained' color='primary' onClick={this._onClickSave}>OK</Button>
            </DialogActions>
            </Dialog>
        )
    }
}

export { IComponentRemoveProps, ComponentRemoveDialog }