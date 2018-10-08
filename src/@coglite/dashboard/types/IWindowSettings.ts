interface IWindowSettings {
    borderWidth: number;
    headerHeight: number;
    resizable: boolean;
    draggable: boolean;
    data: any;
    setBorderWidth(border : number) : void;
    setHeaderHeight(headerHeight : number) : void;
    setResizable(resizable : boolean) : void;
    setDraggable(draggable : boolean) : void;
    setData(data : any) : void;
    config : any;
    setConfig(config : any) : void;
}

export { IWindowSettings }