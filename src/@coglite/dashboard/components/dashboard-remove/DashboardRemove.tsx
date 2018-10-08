import { IMutableSupplier } from '@coglite/apphost';
import { observer } from 'mobx-react';
import { DefaultButton, Dialog, DialogFooter, PrimaryButton } from 'office-ui-fabric-react';
import * as React from 'react';

import { IDashboard } from '../../types/IDashboard';

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
        const footer = (
            <DialogFooter>
                <DefaultButton onClick={this._onClickCancel}>Cancel</DefaultButton>
                <PrimaryButton onClick={this._onClickSave}>OK</PrimaryButton>
            </DialogFooter>
        );

        return (
            <Dialog hidden={!this.props.supplier.value}
                    onDismiss={this._onDismissed}
                    dialogContentProps={
                        {
                            title: this.props.supplier.value ? "Remove Dashboard" : "",
                            subText: this.props.supplier.value ? `Are you sure you want to remove ${this.props.supplier.value.title}?` : ""
                        }   
                    }>
                {footer}
            </Dialog>
        )
    }
}

export { IDashboardRemoveProps, DashboardRemoveDialog }