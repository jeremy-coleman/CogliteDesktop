import * as React from "react";
import { observer } from "mobx-react";
import { IDashboard } from "../../types/IDashboard";
import { BoundTextField } from "@coglite/apphost";
import { Panel, PanelType } from "office-ui-fabric-react";
import { IDashboardAdd } from "../../types/IDashboardAdd";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react";
import { DefaultButton, PrimaryButton } from "office-ui-fabric-react";
import { KeyCodes } from "office-ui-fabric-react";
import { Checkbox } from "office-ui-fabric-react";
import { IDashboardAddStyles, getStyles } from "./DashboardAdd.styles";
import { IDashboardAddClassNames, getClassNames } from "./DashboardAdd.classNames";

interface IDashboardPropertyEditorProps {
    dashboard: IDashboard;
}

@observer
class DashboardPropertyEditor extends React.Component<IDashboardPropertyEditorProps, any> {
    render() {
        return (
            <div className="dashboard-property-editor">
                <BoundTextField label="Title" binding={{ target: this.props.dashboard, key: "title", setter: "setTitle" }} />
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
                <DefaultButton className={this.props.actionClassName} onClick={this._onClickCancel}>Cancel</DefaultButton>
                <PrimaryButton className={this.props.actionClassName} onClick={this._onClickSave} disabled={!this.props.add.saveEnabled}>OK</PrimaryButton>
            </div>
        );
    }
}

@observer
class ExistingDashboardSelector extends React.Component<IDashboardAddProps, any> {
    private _onChange = (option : IDropdownOption) => {
        const dashboard = this.props.add.dashboardList.dashboards.find(db => db.id === option.key);
        this.props.add.setExisting(dashboard);
    }
    render() {
        if(this.props.add.dashboardList.dashboardCount > 0) {
            const options : IDropdownOption[] = this.props.add.dashboardList.dashboards.map(db => {
                return  {
                    key: db.id,
                    text: db.title
                };
            });
            options.unshift({
                key: "",
                text: ""
            });
            return <Dropdown label="From Existing" options={options} onChanged={this._onChange} selectedKey={this.props.add.existing ? this.props.add.existing.id : ""} />;
        }
        return null;
    }
}

interface IDashboardAddEditorProps {
    add: IDashboardAdd;
    className?: string;
}

@observer
class DashboardAddEditor extends React.Component<IDashboardAddEditorProps, any> {
    private _onKeyDown = (e : React.KeyboardEvent<HTMLElement>) => {
        if(e.which === KeyCodes.enter && this.props.add.saveEnabled) {
            this.props.add.save();
        }
    }
    private _onMakeActiveChange = (e, checked) => {
        this.props.add.setMakeActive(checked);
    } 
    render() {
        if(this.props.add.active) {
            return (
                <div className={this.props.className}>
                    <DashboardPropertyEditor dashboard={this.props.add.dashboard} />
                    <ExistingDashboardSelector {...this.props} />
                    <Checkbox label="Set Dashboard Active" onChange={this._onMakeActiveChange} checked={this.props.add.makeActive} styles={{ root: { marginTop: 8 } }}  />
                </div>
            );
        }
        return null;
    }
}

interface IDashboardAddProps {
    add: IDashboardAdd;
    styles?: IDashboardAddStyles;
    className?: string;
}

@observer
class DashboardAddPanel extends React.Component<IDashboardAddProps, any> {
    private _classNames : IDashboardAddClassNames;
    private _onRenderActions = () => {
        return <DashboardAddActions add={this.props.add} className={this._classNames.actions} actionClassName={this._classNames.action} />;
    }
    private _onRenderEditor = () => {
        return <DashboardAddEditor add={this.props.add} className={this._classNames.editor} />;
    }
    private _onDismiss = () => {
        this.props.add.cancel();
    }
    render() {
        this._classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <Panel className={this._classNames.root}
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