import Snackbar from '@material-ui/core/Snackbar';
import * as React from 'react';

interface IValidationErrorsProps {
    errors?: any[];
    className?: string;
    style?: any;
}

class ValidationErrors extends React.Component<IValidationErrorsProps, any> {
    protected _renderError = (error : any, idx : number) => {
        return (
            <Snackbar open={this.props.errors.length > 0? true : false} key={idx}>
                {error.keyTitle ? <label>{error.keyTitle}: </label> : undefined}
                {error.message}
            </Snackbar>
        );
    }
    render() {
        
        if(this.props.errors && this.props.errors.length > 0) {
            const errors = this.props.errors.map(this._renderError);
            return (
                <div>{errors}</div>
            );
        }
        return null;
    }
}

export { IValidationErrorsProps, ValidationErrors }