import { observer } from 'mobx-react';
import * as React from 'react';

import { IGrid } from '../../types';



export interface IGridCellMarginSliderProps {
    grid: IGrid;
    min?: number;
    max?: number;
}

function _GridCellMarginSlider(props) {
        return (
            <input
                type='range'
                aria-label={`Grid Cell Margin ${this.props.grid.cellMargin}`} 
                min={this.props.min || 0} 
                max={this.props.max || 16}
                step={1}
                value={this.props.grid.cellMargin} 
                onChange={e => props.grid.setCellMargin(parseInt(e.currentTarget.value))} 
            />
    )
}

export let GridCellMarginSlider = observer(_GridCellMarginSlider)




//onChange={e => this.props.grid.setCellMargin(parseInt(e.currentTarget.value))} 

//export { IGridCellMarginSliderProps, GridCellMarginSlider }

// @observer
// class GridCellMarginSlider1 extends React.Component<IGridCellMarginSliderProps, any> {
//     private _onChange = (e) => {
//         this.props.grid.setCellMargin(parseInt(e.currentTarget.value));
//     }
//     render() {
//         return (
//             <input
//                 type='range'
//                 aria-label={`Grid Cell Margin ${this.props.grid.cellMargin}`} 
//                 min={this.props.min || 0} 
//                 max={this.props.max || 16} 
//                 value={this.props.grid.cellMargin} 
//                 onChange={this._onChange} 
//             />
//     )
//     }
// }
