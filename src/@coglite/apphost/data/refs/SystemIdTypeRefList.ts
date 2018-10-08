import RefListModel from "./RefListModel";

const SystemIdTypeRefList = new RefListModel([
    { key: "prid", subPath: "application", text: "Permission Request ID" },
    { key: "cid", subPath: "client", text: "Client ID" }
]);

export { SystemIdTypeRefList as default, SystemIdTypeRefList };