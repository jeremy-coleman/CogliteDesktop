import { observer } from 'mobx-react';
import * as React from 'react';

import { IGrid } from '../../types';


export interface IGridCellSizeSliderProps {
    grid: IGrid;
    min?: number;
    max?: number;
}


function _GridCellSizeSlider(props) {
        return (
            <input
                type='range'
                aria-label={`Grid Cell Size ${this.props.grid.cellSize}`}
                min={this.props.min || 10}
                max={this.props.max || 160}
                step={10}
                value={this.props.grid.cellSize} 
                onChange={e => props.grid.setCellSize(parseInt(e.currentTarget.value))} 
            />
    )
}

export let GridCellSizeSlider = observer(_GridCellSizeSlider)


// @observer
// class GridCellSizeSlider extends React.Component<IGridCellSizeSliderProps, any> {
//     private _onChange = (value : number) => {
//         this.props.grid.setCellSize(value);
//     }
//     render() {
//         return <Slider ariaLabel={`Grid Cell Size ${this.props.grid.cellSize}`} min={this.props.min || 10} max={this.props.max || 160} value={this.props.grid.cellSize} onChange={this._onChange} />;
//     }
// }



//export { IGridCellSizeSliderProps, GridCellSizeSlider }