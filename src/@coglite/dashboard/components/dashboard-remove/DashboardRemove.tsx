import { IMutableSupplier } from '@coglite/apphost';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { observer } from 'mobx-react';
import * as React from 'react';

import { IDashboard } from '../../types';


interface IDashboardRemoveProps {
    supplier: IMutableSupplier<IDashboard>;
}

@observer
class DashboardRemoveDialog extends React.Component<IDashboardRemoveProps, any> {
    private _onClickCancel = () => {
        this.props.supplier.clearValue();
    }
    private _onClickSave = () => {
        this.props.supplier.value.removeFromParent();
        this.props.supplier.clearValue();
    }
    private _onDismissed = () => {
        this.props.supplier.clearValue();
    }
    render() {
        return (
            <Dialog 
                open={!this.props.supplier.value ? false : true}
                onClose={this._onDismissed}
            >
            <DialogContentText>{this.props.supplier.value ? `Are you sure you want to remove all Dashboards?` : ""}</DialogContentText>
            <DialogTitle>{this.props.supplier.value ? "Remove all Dashboards" : ""}</DialogTitle>
            <DialogActions>
                <Button variant='contained' color='secondary' onClick={this._onClickCancel}>Cancel</Button>
                <Button variant='contained' color='primary' onClick={this._onClickSave}>OK</Button>
            </DialogActions>
            </Dialog>
        )
    }
}

export { IDashboardRemoveProps, DashboardRemoveDialog }