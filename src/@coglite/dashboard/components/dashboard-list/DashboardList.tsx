import * as React from "react";
import { observer } from "mobx-react";
import { IDashboardList } from "../../types/IDashboardList";
import { DashboardView } from "../dashboard";
import {  SyncComponent } from "@coglite/apphost";
//import { SyncSpinnerView as Sync } from "@coglite/apphost/component/Sync";
import { DashboardAddPanel } from "../dashboard-add";
import { DashboardAddStore } from "../../stores/DashboardAddStore";
import { DashboardRemoveDialog } from "../dashboard-remove";
import { DashboardRemoveStore } from "../../stores/DashboardRemoveStore";
import { DashboardListClearStore } from "../../stores/DashboardListClearStore";
import { IEventTarget } from "@coglite/apphost";
import { IDashboardStyles } from "../dashboard/Dashboard.styles";
import { IDashboardListStyles, getStyles } from "./DashboardList.styles";
import { getClassNames } from "./DashboardList.classNames";
import { DashboardListClearDialog } from "./DashboardListClear";

interface IDashboardListProps {
    dashboardList: IDashboardList;
    host?: IEventTarget;
    styles?: IDashboardListStyles;
    className?: string;
    dashboardStyles?: IDashboardStyles;
}

@observer
class DashboardList extends React.Component<IDashboardListProps, any> {
    componentWillUnmount() {
        this.props.dashboardList.close();
    }
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        const active = this.props.dashboardList.active;
        const dashboards = this.props.dashboardList.dashboards.map(db => {
            return <DashboardView key={db.id} hidden={db !== active} dashboard={db} host={this.props.host} styles={this.props.dashboardStyles} />
        });
        return (
            <div className={classNames.root}>
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