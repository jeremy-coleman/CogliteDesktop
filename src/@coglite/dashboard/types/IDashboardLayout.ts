import { IIconProps } from "office-ui-fabric-react";
import { IDashboard } from "./IDashboard";
import { IContextualMenuItem } from "office-ui-fabric-react";

interface IDashboardLayout {
    key: string;
    name: string;
    iconProps?: IIconProps;
    applyLayout: (dashboard : IDashboard) => Promise<any> | any;
    isLayoutApplied: (dashboard : IDashboard) => boolean;
    createActions?: (dashboard : IDashboard) => IContextualMenuItem[];
}

export { IDashboardLayout }