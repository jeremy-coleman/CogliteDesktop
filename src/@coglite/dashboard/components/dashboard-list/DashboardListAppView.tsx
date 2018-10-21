import { HostAppView, IHostAppViewProps } from '@coglite/apphost';
import { observer } from 'mobx-react';
import * as React from 'react';

import { IDashboardList } from '../../types';
import { createDashboardListLayoutActions, createDashboardListMenu } from '../DashboardLayoutMenuHelper';
import { createCommandBarMenuItem } from '../DashboardMenuHelper';
import { DashboardListContainer } from './DashboardList';

interface IDashboardListAppViewProps extends IHostAppViewProps {
    dashboardList: IDashboardList;
}

@observer
class DashboardListAppView extends React.Component<IDashboardListAppViewProps, any> {
    componentWillMount() {
        this.props.dashboardList.load();
    }
    render() {
        const { dashboardList } = this.props;
        const items : any[] = [
            createCommandBarMenuItem(dashboardList)
        ];
        const layoutItem = createDashboardListMenu(dashboardList);
        if(layoutItem) {
            items.push(layoutItem);
        }
        const actionItems = createDashboardListLayoutActions(dashboardList);
        if(actionItems) {
            actionItems.forEach(i => items.push(i));
        }
        const commandBarProps = Object.assign({}, this.props.commandBarProps);
        commandBarProps.items = commandBarProps.items ? commandBarProps.items.concat(items) : items;
        return (
            <HostAppView {...this.props} commandBarProps={commandBarProps}>
                <DashboardListContainer dashboardList={dashboardList} host={this.props.host} />
                {this.props.children}
            </HostAppView>
        );
    }
}

export { IDashboardListAppViewProps, DashboardListAppView }