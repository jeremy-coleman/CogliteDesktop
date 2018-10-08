import * as React from "react";
import { observer } from "mobx-react";
import { setBoundValue, getBoundValue  } from "../../models";
import {IBoundProps} from '../../types'

import Checkbox, {CheckboxProps} from '@material-ui/core/Checkbox'




interface IBoundCheckboxProps extends CheckboxProps, IBoundProps<any, boolean> {
    onChange?: any,
    styles?: any
}

@observer
class BoundCheckbox extends React.Component<IBoundCheckboxProps, any> {


    private _onChanged = (e : any, checked : boolean) => {
        setBoundValue(this.props, checked);
        if(this.props.onChange) {
            this.props.onChange(e, checked);
        }
    }
    render() {
        const value = getBoundValue(this.props);
        return <Checkbox {...this.props} checked={value} onChange={this._onChanged} />
    }
}

export { IBoundCheckboxProps, BoundCheckbox }