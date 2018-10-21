import { SyncComponent } from '@coglite/apphost';
import Button from '@material-ui/core/Button';
import { observer } from 'mobx-react';
import * as React from 'react';

import { IDashboardList } from '../../types';
import { createMenuItems } from '../DashboardMenuHelper';

interface IDashboardListMenuButtonProps {
    dashboardList: IDashboardList;
}

@observer
class DashboardListMenuButton extends React.Component<IDashboardListMenuButtonProps, any> {
    render() {
        const items = createMenuItems(this.props.dashboardList);
        const active = this.props.dashboardList.active;
        const title = active ? active.title : "Dashboards";
        const menuProps: any = {
            items: items
        };
        return (
            <Button className="dashboard-list-menu-button app-menu-button" contextMenu={menuProps}>{title}</Button>
        );
    }
}

class DashboardListMenuButtonContainer extends React.Component<IDashboardListMenuButtonProps, any> {
    private _onRenderSync = () => {
        return <Button className="dashboard-list-menu-button app-menu-button">Loading...</Button>
    }

    private _onRenderDone = () => {
        return <DashboardListMenuButton {...this.props} />
    }

    // private _onRenderError = () => {
    //     return <Button className="dashboard-list-menu-button app-menu-button error">Error</Button>
    // }

    render() {
        return (
            <SyncComponent 
                sync={this.props.dashboardList.sync}
                onRenderSync={this._onRenderSync}
                onRenderDone={this._onRenderDone} 
            />
    );
 }
}

export { IDashboardListMenuButtonProps, DashboardListMenuButtonContainer, DashboardListMenuButton }