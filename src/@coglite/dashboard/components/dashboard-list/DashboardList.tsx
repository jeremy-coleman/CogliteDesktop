import { IEventTarget, SyncComponent } from '@coglite/apphost';
import { observer } from 'mobx-react';
import * as React from 'react';

import { DashboardAddStore, DashboardListClearStore, DashboardRemoveStore } from '../../stores';
import { IDashboardList } from '../../types/IDashboardList';
import { DashboardView } from '../dashboard';
import { DashboardAddPanel } from '../dashboard-add-panel';
import { DashboardRemoveDialog } from '../dashboard-remove';
import { DashboardListClearDialog } from './DashboardListClear';


var dashboardListStyles = {
        root: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "hidden"
        } as React.CSSProperties
}

interface IDashboardListProps {
    dashboardList: IDashboardList;
    host?: IEventTarget;
    className?: string;
    dashboardStyles?: any;
}


@observer
class DashboardList extends React.Component<IDashboardListProps, any> {
    componentWillUnmount() {
        this.props.dashboardList.close();
    }
    render() {
        const active = this.props.dashboardList.active;
        const dashboards = this.props.dashboardList.dashboards.map(db => {
            return <DashboardView key={db.id} hidden={db !== active} dashboard={db} host={this.props.host} className={this.props.dashboardStyles} />
        });
        return (
            <div style={dashboardListStyles.root}>
                <DashboardAddPanel add={DashboardAddStore} />
                <DashboardRemoveDialog supplier={DashboardRemoveStore} />
                <DashboardListClearDialog supplier={DashboardListClearStore} />
                {dashboards}
            </div>
        );
    }
}

class DashboardListContainer extends React.Component<IDashboardListProps, any> {
    private _onRenderDone = () => {
        return <DashboardList {...this.props} />
    }
    render() {
        return <SyncComponent sync={this.props.dashboardList.sync} syncLabel="Loading Dashboards..." onRenderDone={this._onRenderDone} />;
    }
}

export { IDashboardListProps, DashboardListContainer, DashboardList }