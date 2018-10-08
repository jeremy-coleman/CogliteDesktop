import { IDashboard } from "./IDashboard";
import { IComponent } from "./IComponent";
import { IMutableSync } from "@coglite/apphost";

interface IDashboardList extends IComponent {
    sync: IMutableSync;
    active: IDashboard;
    activeIndex: number;
    dashboards : IDashboard[];
    dashboardCount: number;
    setActive(active : IDashboard) : void;
    setActiveIndex(activeIndex : number) : void;
    add(dashboard : IDashboard, makeActive?: boolean) : void;
    clear() : void;
    load() : Promise<any>;
}

export { IDashboardList }