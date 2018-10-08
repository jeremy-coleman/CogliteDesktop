import RefListModel from "./RefListModel";

const CredentialTypeRefList = new RefListModel([
    { key: "ADAL", text: "ADAL" },
    { key: "FIRE", text: "Firebase" },
    { key: "EDX", text: "Ed-X" },
    { key: "GIT", text: "Github" },
    { key: "FB", text: "Facebook" },
]);

export { CredentialTypeRefList as default, CredentialTypeRefList };