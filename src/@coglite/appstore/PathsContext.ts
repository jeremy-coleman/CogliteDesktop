import { Context } from "@coglite/apphost";
import { IAppstorePaths, AppstorePaths } from "./Paths";

const AppstorePathsContext = new Context<IAppstorePaths>({
    factory() {
        return new AppstorePaths()
    }
});

export { AppstorePathsContext }