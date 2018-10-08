import { action } from 'mobx';

import { ComponentRemoveStore } from '../stores/ComponentRemoveStore';
import { IComponentRemoveOptions } from '../types/IComponentRemove';

const removeComponent = action((opts : IComponentRemoveOptions) => {
    ComponentRemoveStore.init(opts);
});

export { removeComponent }