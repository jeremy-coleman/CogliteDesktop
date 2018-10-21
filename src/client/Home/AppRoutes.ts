interface IAppRoute {
    key: string;
    title: string;
    moduleLoader?: () => Promise<any>;
    moduleComponent?: string;
    path?: string;
    items?: IAppRoute[];
}

const appRoutes: IAppRoute[] = [
    {
         key: "workspace",
         title: "Workspace",
         items: [

            {
                key: "flowbookView",
                path: "workspace/flowbook",
                title: "Flowbook Editor",
                moduleLoader: () => import("../mesh/sample/embedded")
            },
                        {
                key: "flowbookView",
                path: "workspace/flowbook2",
                title: "Flowbook Editor",
                moduleLoader: () => import("../mesh/sample/embedded")
            },

        ]}
];

export { appRoutes, IAppRoute }