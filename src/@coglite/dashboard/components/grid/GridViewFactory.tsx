import * as React from 'react';

import { IComponent, IGrid, IViewFactory } from '../../types';
import { Grid } from './Grid';


class GridViewFactory implements IViewFactory {
    className: string = undefined;
    createView(comp : IComponent) : React.ReactNode {
        return <Grid grid={comp as IGrid} className={this.className} />;
    }
}

export { GridViewFactory }