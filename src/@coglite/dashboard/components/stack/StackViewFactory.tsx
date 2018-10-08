import * as React from 'react';

import { IComponent } from '../../types/IComponent';
import { IStack } from '../../types/IStack';
import { IViewFactory } from '../../types/IViewFactory';
import { Stack } from './Stack';
import { IStackStyles } from './Stack.styles';

class StackViewFactory implements IViewFactory {
    styles: IStackStyles = undefined;
    className: string = undefined;
    createView(comp : IComponent) : React.ReactNode {
        return <Stack stack={comp as IStack} styles={this.styles} className={this.className} />;
    }
}

export { StackViewFactory }