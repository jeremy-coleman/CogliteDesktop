import * as React from 'react';

import { IComponent, IGrid, IViewFactory } from '../../types';
import { Grid } from './Grid';
import { IGridStyles } from './Grid.styles';


class GridViewFactory implements IViewFactory {
    styles: IGridStyles = undefined;
    className: string = undefined;
    createView(comp : IComponent) : React.ReactNode {
        return <Grid grid={comp as IGrid} styles={this.styles} className={this.className} />;
    }
}

export { GridViewFactory }