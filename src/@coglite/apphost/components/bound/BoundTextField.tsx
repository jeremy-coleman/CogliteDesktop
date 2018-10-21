import MuiTextField, { TextFieldProps } from '@material-ui/core/TextField';
import { observer } from 'mobx-react';
import * as React from 'react';

import { getBoundValue, getErrorMessage, setBoundValue } from '../../models';
import { IBoundProps, IError } from '../../types';

//import {withProps} from 'recompose'

interface _IBoundTextFieldProps extends IBoundProps<any, string> {
    errors?: IError[];
    errorMessage?: any
};

type IBoundTextFieldProps = TextFieldProps & _IBoundTextFieldProps;


@observer
class BoundTextField extends React.Component<IBoundTextFieldProps, any> {
    private _onChange = (e: React.ChangeEvent<any>) => {
        setBoundValue(this.props, e.currentTarget.value);
        if(this.props.onChange) {
            this.props.onChange(e.currentTarget.value);
        }
    }

    // _getValueOrError = () => {
    //     if(this.props.errors.length > 0){
    //     getErrorMessage(this.props, this.props.errors)}
    //     else meh
    // }


    render() {
        const value = getBoundValue(this.props);
        return (
            <MuiTextField {...this.props}
                onChange={this._onChange}
                value={value || ""}
                error={this.props.errors && this.props.errors.length ? true : false}
                helperText={getErrorMessage(this.props, this.props.errors)}
                //errorMessage={getErrorMessage(this.props, this.props.errors)}
                style={{margin: '5px', width: '100%'}}
                />
        )
    }
}

// style={{flex: '0 1 auto' , alignSelf: 'middle', overFlow: 'hidden', margin: '5px', borderColor: 'black'}}

export { IBoundTextFieldProps, BoundTextField }
