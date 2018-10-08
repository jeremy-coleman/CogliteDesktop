import * as React from 'react';

import { IComponent } from '../../types/IComponent';
import { IVSplit } from '../../types/ISplit';
import { IViewFactory } from '../../types/IViewFactory';
import { VSplit } from './VSplit';
import { IVSplitStyles } from './VSplit.styles';

class VSplitViewFactory implements IViewFactory {
    styles: IVSplitStyles = undefined;
    className : string = undefined;
    createView(comp : IComponent) : React.ReactNode {
        return <VSplit vsplit={comp as IVSplit} styles={this.styles} className={this.className} />;
    }
}

export { VSplitViewFactory }