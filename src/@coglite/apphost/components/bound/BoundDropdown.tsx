import { observer } from 'mobx-react';
import { Dropdown } from 'office-ui-fabric-react';
import * as React from 'react';

import { getBoundValue, setBoundValue } from '../../models';
import { IBoundProps, IOptionListModel } from '../../types';

type AnyProps = any

interface IBoundDropdownProps extends AnyProps, IBoundProps<any, string> {
    optionList?: IOptionListModel;
    sortOptions?: boolean;
    includeEmptyOption?: boolean;
    emptyOptionText?: string;
}

@observer
class BoundDropdown extends React.Component<IBoundDropdownProps, any> {
    private _onChange = (option : any, index?) => {
        setBoundValue(this.props, String(option.key));
        if(this.props.onChange) {
            this.props.onChange(option, index);
        }
    }
    render() {
        let dropdownOptions : any[] = [];
        if(this.props.options) {
            dropdownOptions = dropdownOptions.concat(this.props.options);
        }
        const optionsList = this.props.optionList;
        if(optionsList) {
            const options = this.props.sortOptions ? optionsList.itemsSorted : optionsList.itemsView;
            options.forEach(o => {
                dropdownOptions.push({
                    key: o.key,
                    text: o.text
                });
            });
        }
        
        if(this.props.includeEmptyOption) {
            dropdownOptions.unshift({ key: "", text: this.props.emptyOptionText || ""});
        }

        const value = getBoundValue(this.props);
        return <Dropdown {...this.props} options={dropdownOptions} onChange={this._onChange} selectedKey={value || ""} />
    }
}

export { IBoundDropdownProps, BoundDropdown }