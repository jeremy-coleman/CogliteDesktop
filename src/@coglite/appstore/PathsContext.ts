import { Context } from '@coglite/apphost';

import { AppstorePaths, IAppstorePaths } from './Paths';

const AppstorePathsContext = new Context<IAppstorePaths>({
    factory() {
        return new AppstorePaths()
    }
});

export { AppstorePathsContext }