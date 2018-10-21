import { css } from '@coglite/design-system';
import { observer } from 'mobx-react';
import * as React from 'react';
import { stylesheet } from 'typestyle';

import { IGrid } from '../../types';
import { GridPortalManager } from './GridPortalManager';


let gridStyles = stylesheet({
    root: {
            position: "relative",
            overflow: "auto",
            background: "transparent",
            $nest:{
                "&.has-maximized": {
                    overflow: "hidden"
                }
            }
    },
        
        gridCells: {},
        overlay: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'white',
            opacity: 0.1,
            zIndex: 2
        },
        row: {
            display: "flex"
        },
        cell: {
            backgroundColor: '#eaeaea'
        },
        portal: {
            boxShadow: `0 0 ${5}px 0 rgba(0, 0, 0, 0.4)`,
            transition: "top 0.2s ease, right 0.2s ease, bottom 0.2s ease, left 0.2s ease, width 0.2s ease, height 0.2s ease"
        }
})


interface IGridProps {
    grid: IGrid;
    className?: string;
    //styles?: IGridStyles;
    moveTimeout?: number;
}

const Defaults = {
    moveTimeout: 200
};

const getRowIndex = (grid : IGrid, vy : number) : number => {
    if(vy < 0) {
        return 0;
    }
    const y = vy - grid.y;
    return Math.floor(y / (grid.cellSize + grid.cellMargin));
};

const getColIndex = (grid : IGrid, vx : number) : number => {
    if(vx < 0) {
        return 0;
    }
    const x = vx - grid.x;
    return Math.floor(x / (grid.cellSize + grid.cellMargin));
};

@observer
class GridCells extends React.Component<IGridProps, any> {
    //private _classNames : IGridClassNames;
    private _renderCell(row : number, column : number) : React.ReactNode {
        return (
            <div key={column}
                 className={gridStyles.cell}
                 style={{
                     minWidth: this.props.grid.cellSize,
                     width: this.props.grid.cellSize,
                     minHeight: this.props.grid.cellSize,
                     height: this.props.grid.cellSize,
                     marginLeft: this.props.grid.cellMargin
                 }}>
            </div>
        )
    }
    private _renderRow(row : number) : React.ReactNode {
        const cells = [];
        for(let i = 0; i < this.props.grid.columns; i ++) {
            cells.push(this._renderCell(row, i));
        }
        return (
            <div className={gridStyles.row} key={row} style={{ marginTop: this.props.grid.cellMargin }}>
                {cells}
            </div>
        );
    }
    render() {
        const { grid, className } = this.props;
        const rows = [];
        for(let r = 0; r < grid.rows; r ++) {
            rows.push(this._renderRow(r));
        }
        return (
            <div className={gridStyles.gridCells}>
                {rows}
            </div>
        );
    }
}


@observer
class GridDragOverlay extends React.Component<IGridProps, any> {
    private _ref : HTMLDivElement;
    private _onRef = (ref : HTMLDivElement) => {
        this._ref = ref;
    }
    get moveTimeout() {
        return this.props.moveTimeout >= 0 ? this.props.moveTimeout : Defaults.moveTimeout;
    }
    private _onDragOver = (e : React.DragEvent<HTMLElement>) => {
        const { grid } = this.props;
        e.stopPropagation();
        e.preventDefault();
        try {
            e.dataTransfer.dropEffect = "move";
        } catch(ex) {}
        const drag = grid.drag;
        const rootBounds = this._ref.getBoundingClientRect();
        let vx = e.clientX - rootBounds.left;
        let vy = e.clientY - rootBounds.top;
        const dx = drag.dragState.offsetX || 0;
        const dy = drag.dragState.offsetY || 0;
        vx -= dx;
        vy -= dy;
        const colIndex = getColIndex(grid, vx);
        const rowIndex = getRowIndex(grid, vy);
        // delayed move to deal with row index changing
        // TODO: move this to a utility
        const current = new Date().getTime();
        const init = drag.dragState.init;
        if(!init) {
            drag.setDragState({
                init: current,
                colIndex: colIndex,
                rowIndex: rowIndex
            });
        } else {
            if(current - init > this.moveTimeout) {
                if(colIndex === drag.dragState.colIndex && rowIndex === drag.dragState.rowIndex) {
                    grid.moveTo(colIndex, rowIndex);
                } else {
                    drag.setDragState({
                        init: current,
                        colIndex: colIndex,
                        rowIndex: rowIndex
                    });
                }
            }
            
        }
    }
    private _onDrop = (e : React.DragEvent<HTMLElement>) => {
        const { grid } = this.props;
        const drag = grid.drag;
        e.stopPropagation();
        e.preventDefault();
        const rootBounds = this._ref.getBoundingClientRect();
        let vx = e.clientX - rootBounds.left;
        let vy = e.clientY - rootBounds.top;
        const dx = drag.dragState.offsetX || 0;
        const dy = drag.dragState.offsetY || 0;
        vx -= dx;
        vy -= dy;
        const colIndex = getColIndex(grid, vx);
        const rowIndex = getRowIndex(grid, vy);
        grid.moveTo(colIndex, rowIndex);
    }
    render() {
        const { grid, className } = this.props;
        if(grid.drag) {
            return (
                <div className={css(gridStyles.overlay, "drag")}
                    onDragOver={this._onDragOver}
                    onDrop={this._onDrop}
                    ref={this._onRef}>
                </div>
            );
        }
        return null;
    }
}

@observer
class GridResizeOverlay extends React.Component<IGridProps, any> {
    private _ref : HTMLDivElement;
    private _onRef = (ref : HTMLDivElement) => {
        this._ref = ref;
    }
    private _onDragOver = (e : React.DragEvent<HTMLElement>) => {
        const { grid } = this.props;
        const rootBounds = this._ref.getBoundingClientRect();
        let vx = e.clientX - rootBounds.left;
        let vy = e.clientY - rootBounds.top;
        const colIndex = getColIndex(grid, vx);
        const rowIndex = getRowIndex(grid, vy);
        this.props.grid.resizeTo(colIndex, rowIndex);
    }
    private _onDrop = (e : React.MouseEvent<HTMLElement>) => {
        this.props.grid.resizeEnd();
    }
    render() {
        if(this.props.grid.resizing) {
            return (
                <div className={css(gridStyles.overlay, "resize", this.props.grid.resizeType)}
                    onDragOver={this._onDragOver}
                    onDrop={this._onDrop}
                    ref={this._onRef}>
                </div>
            );
        }
        return null;
    }
}

@observer
class Grid extends React.Component<IGridProps, any> {

    private _portalManager : GridPortalManager;
    private _setPortalManager(props : IGridProps) {
        this._portalManager = new GridPortalManager(this.props.grid, { portalClassName: gridStyles.portal });
        this.props.grid.setPortalManager(this._portalManager);
    }
    componentWillMount() {
        const { grid, className } = this.props;
        this._setPortalManager(this.props);
    }

    componentWillReceiveProps(nextProps : IGridProps) {
        // if(nextProps.styles !== this.props.styles) {
        //     this._classNames = getClassNames(getStyles(null, this.props.styles));
        // }
        
        if(this._portalManager && nextProps.grid !== this._portalManager.grid) {
            this._setPortalManager(nextProps);
        }
    }
    componentWillUnmount() {
        if(this._portalManager) {
            this._portalManager.cleanup();
        }
        this.props.grid.setPortalManager(undefined);
    }
    render() {
        const { grid } = this.props;
        return (
            <div className={css(gridStyles.root, { "has-maximized": grid.maximized ? true : false})}
                 style={{
                     position: grid.maximized ? "absolute" : undefined,
                     top: grid.maximized ? 0 : undefined,
                     right: grid.maximized ? 0 : undefined,
                     bottom: grid.maximized ? 0 : undefined,
                     left: grid.maximized ? 0 : undefined,
                     width: grid.maximized ? undefined : grid.gridWidth,
                     height: grid.maximized ? undefined : grid.gridHeight,
                     overflow: grid.maximized ? "hidden" : undefined
                 }}>
                <GridCells {...this.props} />
                <GridDragOverlay {...this.props} />
                <GridResizeOverlay {...this.props} />
            </div>
        );
    }
}

export { IGridProps, Grid }