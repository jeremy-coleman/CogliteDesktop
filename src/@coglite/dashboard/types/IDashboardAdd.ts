import { IDashboardList } from "./IDashboardList";
import { IDashboard } from "./IDashboard";

interface IDashboardAddOptions {
    dashboardList: IDashboardList;
    existing?: IDashboard;
}

interface IDashboardAdd {
    active : boolean;
    dashboardList : IDashboardList;
    existing : IDashboard;
    dashboard : IDashboard;
    saveEnabled: boolean;
    makeActive : boolean;

    init(opts : IDashboardAddOptions) : void;
    setExisting(existing : IDashboard) : void;
    setMakeActive(makeActive : boolean) : void;
    save() : void;
    cancel() : void;
}

export { IDashboardAddOptions, IDashboardAdd }