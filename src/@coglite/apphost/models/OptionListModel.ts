import { computed } from 'mobx';

import { IOption, IOptionListModel } from '../types';
import { sort } from '../util/SortUtils';
import { ListModel } from './ListModel';

class OptionListModel extends ListModel<IOption> implements IOptionListModel {
    getOption(key: string, defaultOption?: IOption) : IOption {
        const option = this.items.find(o => {
            return o.key === key;
        });
        return option || defaultOption;
    }

    @computed
    get itemsSorted(): IOption[] {
        return sort(this.itemsView, { field: "text", descending: false });
    }
}

export { OptionListModel }