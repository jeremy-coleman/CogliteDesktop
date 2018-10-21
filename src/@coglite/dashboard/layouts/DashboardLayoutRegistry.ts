import { ListModel } from '@coglite/apphost';

import { IDashboardLayout } from '../types';
import { GridDashboardLayout } from './GridDashboardLayout';
import { TabDashboardLayout } from './TabDashboardLayout';
import { ThreeColumnSplitDashboardLayout } from './ThreeColumnSplitDashboardLayout';
import { TwoColumnSplitDashboardLayout } from './TwoColumnSplitDashboardLayout';


// the dashboard layout register - initialized with defaults
const DashboardLayoutRegistry = new ListModel<IDashboardLayout>([
    TabDashboardLayout,
    TwoColumnSplitDashboardLayout,
    ThreeColumnSplitDashboardLayout,
    GridDashboardLayout
]);

export { DashboardLayoutRegistry }