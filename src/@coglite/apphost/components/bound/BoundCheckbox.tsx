import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { observer } from 'mobx-react';
import * as React from 'react';

import { getBoundValue, setBoundValue } from '../../models';
import { IBoundProps } from '../../types';




interface IBoundCheckboxProps extends CheckboxProps, IBoundProps<any, boolean> {
    onChange?: any,
    styles?: any
}

@observer
class BoundCheckbox extends React.Component<IBoundCheckboxProps, any> {


    private _onChange = (e : any, checked : boolean) => {
        setBoundValue(this.props, checked);
        if(this.props.onChange) {
            this.props.onChange(e, checked);
        }
    }
    render() {
        const value = getBoundValue(this.props);
        return <Checkbox {...this.props} checked={value} onChange={this._onChange} />
    }
}

export { IBoundCheckboxProps, BoundCheckbox }