import RefListModel from "./RefListModel";

const GenderRefList = new RefListModel([
    {
        key: "MALE",
        text: "Male"
    },
    {
        key: "FEMALE",
        text: "Female"
    }
]);

export { GenderRefList as default, GenderRefList };