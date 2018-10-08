import { action } from 'mobx';

import { DashboardAddStore, DashboardListClearStore, DashboardRemoveStore } from '../stores';
import { IDashboard, IDashboardAddOptions, IDashboardList } from '../types';

const addDashboard = action((opts : IDashboardAddOptions) => {
    DashboardAddStore.init(opts);
});

const removeDashboard = action((dashboard : IDashboard) => {
    DashboardRemoveStore.value = dashboard;
});

const clearDashboards = action((dashboardList : IDashboardList) => {
    DashboardListClearStore.value = dashboardList;
});

export { addDashboard, removeDashboard, clearDashboards }