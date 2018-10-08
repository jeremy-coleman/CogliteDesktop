import { IWindowManager } from "./IWindowManager";
import { IWindow, IWindowConfig } from "./IWindow";
import { IGridBounds } from "./IGridBounds";

interface IGridConfig {
    type?: string;
    cellSize?: number;
    cellMargin?: number;
    rows?: number;
    columns?: number;
    defaultWindowColSpan?: number;
    defaultWindowRowSpan?: number;
    windows?: IWindowConfig[];
    closeDisabled?: boolean;
    maximizedIndex?: number;
}

interface IGrid extends IWindowManager {
    rows: number;
    columns: number;
    cellSize: number;
    cellMargin: number;
    gridWidth : number;
    gridHeight : number;
    defaultWindowColSpan : number;
    defaultWindowRowSpan : number;
    setCellSize(cellSize : number) : void;
    setCellMargin(cellMargin : number) : void;
    setRows(rows : number) : void;
    setColumns(columns : number) : void;
    setDefaultWindowColSpan(defaultWindowColSpan : number) : void;
    setDefaultWindowRowSpan(defaultWindowRowSpan : number) : void;
    moveTo(colIndex : number, rowIndex : number, window?: IWindow) : void;
    resizeTo(colIndex : number, rowIndex : number, window?: IWindow) : void;
    getCollisions(pos : IGridBounds) : IWindow[];
    getBounds(window : IWindow) : IGridBounds;
    setBounds(window : IWindow, pos : IGridBounds) : void;
    config: IGridConfig;
    setConfig(config : IGridConfig) : void;
}

export { IGrid, IGridConfig }