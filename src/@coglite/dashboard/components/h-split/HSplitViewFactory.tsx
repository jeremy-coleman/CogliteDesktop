import * as React from 'react';

import { IComponent } from '../../types/IComponent';
import { IHSplit } from '../../types/ISplit';
import { IViewFactory } from '../../types/IViewFactory';
import { HSplit } from './HSplit';
import { IHSplitStyles } from './HSplit.styles';

class HSplitViewFactory implements IViewFactory {
    styles: IHSplitStyles = undefined;
    className : string = undefined;
    createView(comp : IComponent) : React.ReactNode {
        return <HSplit hsplit={comp as IHSplit} styles={this.styles} className={this.className} />;
    }
}

export { HSplitViewFactory }