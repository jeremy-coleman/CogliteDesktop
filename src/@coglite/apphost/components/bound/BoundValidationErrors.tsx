import { observer } from 'mobx-react';
import * as React from 'react';

import { getBoundValue } from '../../models';
import { IBoundProps } from '../../types';
import { IValidationErrorsProps, ValidationErrors } from '../ValidationErrors';

interface IBoundValidationErrorsProps extends IValidationErrorsProps, IBoundProps<any, any[]> {}

@observer
class BoundValidationErrors extends React.Component<IBoundValidationErrorsProps, any> {
    render() {
        const value = getBoundValue(this.props);
        return <ValidationErrors {...this.props} errors={value} />;
    }
}

export { IBoundValidationErrorsProps, BoundValidationErrors }