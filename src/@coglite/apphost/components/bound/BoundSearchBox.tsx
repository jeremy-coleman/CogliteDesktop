import { observer } from 'mobx-react';
import * as React from 'react';

import Input from '@material-ui/core/Input';

function SearchBox(props){
   return <Input placeholder="Search…" disableUnderline {...props}>{props.children}</Input>
}

import { getBoundValue, setBoundValue } from '../../models';

import {IBoundProps} from '../../types'

type AnyProps = any
interface IBoundSearchBoxProps extends AnyProps, IBoundProps<any, string> { }

@observer
class BoundSearchBox extends React.Component<IBoundSearchBoxProps, any> {
    
    private _onChanged = (value : string) => {
        setBoundValue(this.props, value);
        if(this.props.onChange) {
            this.props.onChange(value);
        }
    }
    render() {
        const value = getBoundValue(this.props);
        return <SearchBox
                {...this.props}
                onChange={this._onChanged}
                value={value || ""}
                />
    }
}

export { IBoundSearchBoxProps, BoundSearchBox }