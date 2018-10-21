import Toggle from '@material-ui/core/Switch';
import { observer } from 'mobx-react';
import * as React from 'react';

import { getBoundValue, setBoundValue } from '../../models';
import { IBoundProps } from '../../types';

interface IBoundToggleProps extends IBoundProps<any, boolean> {
    onChange?: any
}


@observer
class BoundToggle extends React.Component<IBoundToggleProps, any> {
    private _onChange = (e, checked : boolean) => {
        setBoundValue(this.props, checked);
        if(this.props.onChange) {
            this.props.onChange(checked);
        }
    }
    render() {
        const value = getBoundValue(this.props);
        return (
            <Toggle {...this.props}
                checked={value}
                onChange={this._onChange}
            />
        )
    }
}

export { IBoundToggleProps, BoundToggle }