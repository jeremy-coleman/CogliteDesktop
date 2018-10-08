import * as React from "react";
import { observer } from "mobx-react";
import { Dialog, DialogFooter } from "office-ui-fabric-react";
import { DefaultButton, PrimaryButton } from "office-ui-fabric-react";
import { IComponentRemove } from "../types/IComponentRemove";

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
        let footer = (
            <DialogFooter>
                <DefaultButton className="dashboard-form-action" onClick={this._onClickCancel}>Cancel</DefaultButton>
                <PrimaryButton className="dashboard-form-action" onClick={this._onClickSave}>OK</PrimaryButton>
            </DialogFooter>
        );
        
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
            <Dialog hidden={!this.props.remove.active}
                    onDismiss={this._onDismissed}
                    dialogContentProps={
                        {
                            title: `Close ${title}`,
                            subText: `Are you sure you want to close ${title}?`
                        }   
                    }>
                {footer}
            </Dialog>
        )
    }
}

export { IComponentRemoveProps, ComponentRemoveDialog }