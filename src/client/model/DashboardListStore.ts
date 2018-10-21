import { AppstorePathsContext } from '@coglite/appstore';
import { ComponentFactory, DashboardListModel } from '@coglite/dashboard';

import { AppRouter } from '../AppRouter';
import { DashboardStorageServiceContext } from '../services/DashboardStorageServiceContext';

const storageKey = "coglite-desktop-dashboard-list";

const DashboardListStore = new DashboardListModel();
DashboardListStore.componentFactory = ComponentFactory;
DashboardListStore.setRouter(AppRouter);
DashboardListStore.loader = () => {
    return DashboardStorageServiceContext.value.getItem(storageKey);
};
DashboardListStore.saver = (data) => {
    return DashboardStorageServiceContext.value.setItem(storageKey, data);
};
DashboardListStore.addApp = { title: "Add Widget", path: AppstorePathsContext.value.userListings() };

export { DashboardListStore }