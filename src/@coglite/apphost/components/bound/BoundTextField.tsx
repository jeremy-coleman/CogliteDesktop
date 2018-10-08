import MuiTextField, { TextFieldProps } from '@material-ui/core/TextField';
import { observer } from 'mobx-react';
import * as React from 'react';

import { getBoundValue, getErrorMessage, setBoundValue } from '../../models';
import {IBoundProps, IError} from '../../types'

//import { ITextFieldProps, TextField } from 'office-ui-fabric-react';
//import {withProps} from 'recompose'

interface IBoundTextFieldProps extends TextFieldProps, IBoundProps<any, string> {
    errors?: IError[];
    errorMessage?: any
}

const TextField = (props) =>  <MuiTextField {...props}/>

@observer
class BoundTextField extends React.Component<IBoundTextFieldProps, any> {
    private _onChanged = (e) => {
        setBoundValue(this.props, e.currentTarget.value);
        if(this.props.onChange) {
            this.props.onChange(e.currentTarget.value);
        }
    }
    render() {
        const value = getBoundValue(this.props);
        return (
            <TextField {...this.props}
                onChange={this._onChanged}
                value={value || ""}
                errorMessage={getErrorMessage(this.props, this.props.errors)}
                style={{margin: '5px', width: '100%'}}
                />
        )
    }
}

// style={{flex: '0 1 auto' , alignSelf: 'middle', overFlow: 'hidden', margin: '5px', borderColor: 'black'}}

export { IBoundTextFieldProps, BoundTextField }



    // private _onChanged = (e, value : string) => {
    //     setBoundValue(this.props, value);
    //     if(this.props.onChange) {
    //         this.props.onChange(e, value);
    //     }
    // }

// const TextField = withProps({
//     errors: [] as IError[],
//     onChange: (e) => {
//         setBoundValue(this.props, e.value);
//         if(this.props.onChange) {
//             this.props.onChange(e.value);
//         }
//     },
//     errorMessage: undefined as any
// })(MuiTextField as any);


// withProps(
//   createProps: (ownerProps: Object) => Object | Object
// ): HigherOrderComponent
