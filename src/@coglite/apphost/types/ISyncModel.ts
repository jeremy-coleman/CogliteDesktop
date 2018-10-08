interface ISyncModel<I = any> {
    id: I;
    type: any;
    startDate: Date;
    endDate: Date;
    error: any;
    syncing: boolean;
    hasSynced: boolean;
}

export { ISyncModel, ISyncModel as default }