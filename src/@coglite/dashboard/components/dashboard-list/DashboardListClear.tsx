import * as React from "react";
import { observer } from "mobx-react";
import { Dialog, DialogFooter } from "office-ui-fabric-react";
import { DefaultButton, PrimaryButton } from "office-ui-fabric-react";
import { IMutableSupplier } from "@coglite/apphost";
import { IDashboardList } from "../../types/IDashboardList";

interface IDashboardListClearProps {
    supplier: IMutableSupplier<IDashboardList>;
}

@observer
class DashboardListClearDialog extends React.Component<IDashboardListClearProps, any> {
    private _onClickCancel = () => {
        this.props.supplier.clearValue();
    }
    private _onClickSave = () => {
        this.props.supplier.value.clear();
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
                            title: this.props.supplier.value ? "Remove all Dashboards" : "",
                            subText: this.props.supplier.value ? `Are you sure you want to remove all Dashboards?` : ""
                        }   
                    }>
                {footer}
            </Dialog>
        )
    }
}

export { IDashboardListClearProps, DashboardListClearDialog }