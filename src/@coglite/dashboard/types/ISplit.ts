import { IComponent } from "./IComponent";

interface ISplit extends IComponent {
    offset : number;
    first: IComponent;
    second: IComponent;
    splitActive : boolean;
    setOffset(offset : number) : void;
    setFirst(first : IComponent) : void;
    setSecond(second : IComponent) : void;
    setSplitActive(splitActive : boolean) : void;
}

interface IHSplitConfig {
    type?: string;
    offset?: number;
    left?: any;
    right?: any;
    leftWidth?: number;
    minItemWidth?: number;
}

interface IHSplit extends ISplit {
    minItemWidth: number;
    leftWidth: number;
    rightWidth: number;
    splitterWidth: number;
    left: IComponent;
    right: IComponent;
    setLeft(left : IComponent) : void;
    setRight(right : IComponent) : void;
    setLeftWidth(leftWidth : number) : void;
    setRightWidth(rightWidth : number) : void;
    setMinItemWidth(minItemWidth : number) : void;
    config : IHSplitConfig;
    setConfig(config : IHSplitConfig) : void;
    columnCount : number;
}

interface IVSplitConfig {
    type?: string;
    offset?: number;
    top?: any;
    bottom?: any;
    topHeight?: number;
    minItemHeight?: number;
}

interface IVSplit extends ISplit {
    minItemHeight: number;
    topHeight: number;
    bottomHeight: number;
    splitterHeight: number;
    top: IComponent;
    bottom: IComponent;
    setTop(top : IComponent) : void;
    setBottom(bottom : IComponent) : void;
    setMinItemHeight(minItemHeight : number) : void;
    config : IVSplitConfig;
    setConfig(config : IVSplitConfig) : void;
    rowCount : number;
}

export {
    ISplit,
    IHSplit,
    IHSplitConfig,
    IVSplit,
    IVSplitConfig
}