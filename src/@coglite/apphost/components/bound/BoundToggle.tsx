import * as React from "react";
import { observer } from "mobx-react";
import { setBoundValue, getBoundValue  } from "../../models";
import Toggle from '@material-ui/core/Switch'
import {IBoundProps} from '../../types'

interface IBoundToggleProps extends IBoundProps<any, boolean> {
    onChange?: any
}


@observer
class BoundToggle extends React.Component<IBoundToggleProps, any> {
    private _onChanged = (e, checked : boolean) => {
        setBoundValue(this.props, checked);
        if(this.props.onChange) {
            this.props.onChange(checked);
        }
    }
    render() {
        const value = getBoundValue(this.props);
        return <Toggle {...this.props} checked={value} onChange={this._onChanged} />
    }
}

export { IBoundToggleProps, BoundToggle }