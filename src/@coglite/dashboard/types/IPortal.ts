interface IPortal {
    setViewport(x: number, y: number, width: number, height: number);
    scrollIntoView() : void;
    bringToFront() : void;
    bringToBase() : void;
    destroy() : void;
}

export { IPortal }