import { theme } from '@coglite/apphost';
import { css } from '@coglite/design-system';
import IconButton from '@material-ui/core/IconButton';
import BackToWindow from '@material-ui/icons/ArrowBack';
import Close from '@material-ui/icons/Close';
import Fullscreen from '@material-ui/icons/FullScreen';
import { observer } from 'mobx-react';
import * as React from 'react';
import { stylesheet } from 'typestyle';

import { WindowResizeType } from '../../constants/WindowResizeType';
import { IWindow } from '../../types';

const windowStyles = stylesheet({
     root: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: theme.palette.white,
            borderColor: theme.palette.neutralSecondary,
            borderStyle: "solid",
            $nest: {
                "&.content-hidden": {
                    height: 28
                },
                "&.maximized": {
                    zIndex: 4
                }
            }
        },
        header: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "flex-start",
            cursor: "pointer",
            overflow: "hidden",
            backgroundColor: theme.palette.neutralSecondary,
            color: theme.palette.white
        },
        titleContainer: {
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            overflow: "hidden",
            paddingLeft: 8,
            paddingRight: 8
        },
        title: {
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap"
        },
        action: {
            color: theme.palette.white,
            height: 28,
            width: 28,
            lineHeight: 28,
            cursor: "pointer",
            padding: "0px",
            outline: "none",
            border: "none",
            background: "transparent",
            $nest: {
                ":hover": {
                    color: theme.palette.white,
                    backgroundColor: theme.palette.neutralTertiary
                },
                "&.close-action": {
                    $nest: {
                        ":hover": {
                            color: theme.palette.white,
                            backgroundColor: theme.palette.redDark
                        }
                    }
                },
                "& .window-action-icon": {
                    lineHeight: "16px",
                    fontSize: '10px',
                    fontWeight: 400,
                    margin: "0px",
                    height: "16px",
                    width: "16px"
                }
            }
        },
        actionBar: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center"
        },
        body: {
            position: "absolute",
            left: 0,
            bottom: 0,
            right: 0,
            overflow: "auto",
            backgroundColor: theme.palette.white,
            $nest: {
                "&.content-hidden": {
                    height: 0,
                    overflow: "hidden"
                }
            }
        },
        resize: {
            $nest: {
                "&.top": {
                    position: "absolute",
                    zIndex: 2,
                    top: -2,
                    height: 5,
                    left: 0,
                    right: 0,
                    cursor: "n-resize"
                },
                "&.right": {
                    position: "absolute",
                    zIndex: 2,
                    right: -2,
                    width: 5,
                    top: 0,
                    bottom: 0,
                    cursor: "e-resize"
                },
                "&.bottom": {
                    position: "absolute",
                    zIndex: 2,
                    bottom: -2,
                    height: 5,
                    left: 0,
                    right: 0,
                    cursor: "s-resize"
                },
                "&.left": {
                    position: "absolute",
                    zIndex: 2,
                    left: -2,
                    width: 5,
                    top: 0,
                    bottom: 0,
                    cursor: "w-resize"
                },
                "&.topLeft": {
                    position: "absolute",
                    zIndex: 3,
                    left: -4,
                    top: -4,
                    width: 10,
                    height: 10,
                    cursor: "nw-resize"
                },
                "&.topRight": {
                    position: "absolute",
                    zIndex: 3,
                    right: -4,
                    top: -4,
                    width: 10,
                    height: 10,
                    cursor: "ne-resize"
                },
                "&.bottomLeft": {
                    position: "absolute",
                    zIndex: 3,
                    left: -4,
                    bottom: -4,
                    width: 10,
                    height: 10,
                    cursor: "sw-resize"
                },
                "&.bottomRight": {
                    position: "absolute",
                    zIndex: 3,
                    right: -4,
                    bottom: -4,
                    width: 10,
                    height: 10,
                    cursor: "se-resize"
                }
            }
        }
})



interface IWindowProps {
    window: IWindow;
    className?: string;
}

//    <Close/> <Icon className="window-action-icon" iconName="ChromeClose" />

@observer
class WindowCloseAction extends React.Component<IWindowProps, any> {
    private _onMouseDown = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    }
    private _onClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        this.props.window.close();
    }
    render() {
        if(this.props.window && !this.props.window.closeDisabled) {
           return (
                <IconButton type="button"
                        className={css(this.props.className, "close-action")}
                        title={`Close ${this.props.window.title || "App"}`}
                        onClick={this._onClick}
                        onMouseDown={this._onMouseDown}>
                        <Close/>
                </IconButton>
           );
        }
        return null;
    }
}

@observer
class WindowMaximizeAction extends React.Component<IWindowProps, any> {
    private _onMouseDown = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    }
    private _onClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        this.props.window.setMaximized(!this.props.window.maximized);
    }
    render() {
        if(this.props.window) {
            return (
                <IconButton type="button"
                        className={css(this.props.className, "maximize-action")}
                        title={this.props.window.maximized ? "Restore" : "Maximize"}
                        onClick={this._onClick}
                        onMouseDown={this._onMouseDown}>
                    {this.props.window.maximized ? <BackToWindow/>: <Fullscreen/> }
                </IconButton>
            )
        }
        return null;
    }
}

@observer
class Window extends React.Component<IWindowProps, any> {
    private _ref : HTMLDivElement;
    private _canDrag : boolean = false;
    private _dragOffsetX : number;
    private _dragOffsetY : number;
    private _onHeaderMouseDown = (e : React.MouseEvent<HTMLElement>) => {
        if(this.props.window.settings.draggable) {
            this._canDrag = true;
            this._ref.draggable = true;
            const bounds = this._ref.getBoundingClientRect();
            this._dragOffsetX = e.clientX - bounds.left;
            this._dragOffsetY = e.clientY - bounds.top;
        }
    }
    private _onHeaderDoubleClick = (e : React.MouseEvent<HTMLElement>) => {
        const { window } = this.props;
        window.setMaximized(!window.maximized);
    }
    private _onMouseUp = (e : React.MouseEvent<HTMLElement>) => {
        this._canDrag = false;
    }
    private _onDragStart = (e : React.DragEvent<HTMLElement>) => {
        if(this._canDrag) {
            e.stopPropagation();
            const transferText = String(JSON.stringify(this.props.window.config));
            e.dataTransfer.setData("text", transferText);
            window.setTimeout(() => {
                this.props.window.dragStart({ offsetX: this._dragOffsetX, offsetY: this._dragOffsetY });
            }, 1);
        } else {
            e.preventDefault();
        }
    }
    private _onDragEnd = (e : React.DragEvent<HTMLElement>) => {
        this._canDrag = false;
        this._ref.draggable = false;
        this.props.window.dragEnd();
    }
    private _resizeDragStartHandler(type : WindowResizeType) {
        return (e : React.DragEvent<HTMLElement>) => {
            e.stopPropagation();
            e.dataTransfer.setData("text", "Resizing Window " + this.props.window.id);
            window.setTimeout(() => {
                this.props.window.resizeStart(type);
            }, 1);
        };
    }
    private _onResizeDragEnd = (e : React.DragEvent<HTMLElement>) => {
        this.props.window.resizeEnd();
    }
    private _onRef = (ref : HTMLDivElement) => {
        this._ref = ref;
    }
    private _renderTitle() : React.ReactNode {
        return (
            <div className={windowStyles.titleContainer}>
                <div className={windowStyles.title}>
                    {this.props.window.title}
                </div>
            </div>
        );
    }
    private _renderActionBar() : React.ReactNode {
        return (
            <div className={windowStyles.actionBar}>
                <WindowMaximizeAction {...this.props} className={css(windowStyles.action, "maximize-action")} />
                <WindowCloseAction {...this.props} className={css(windowStyles.action, "close-action")} />
            </div>
        );
    }
    private _renderHeader() : React.ReactNode {
        if(this.props.window.settings.headerHeight > 0) {
            return (
                <div className={windowStyles.header}
                    onMouseDown={this._onHeaderMouseDown}
                    onDoubleClick={this._onHeaderDoubleClick}
                    style={{
                        top: 0,
                        right: 0,
                        left: 0,
                        height: this.props.window.settings.headerHeight
                    }}>
                    {this._renderTitle()}
                    {this._renderActionBar()}
                </div>
            );
        }
        return null;
    }
    private _renderBody() : React.ReactNode {
        return (
            <div className={css(windowStyles.body, { "content-hidden": this.props.window.contentHidden})}
                 style={{
                    top: this.props.window.settings.headerHeight,
                    right: 0,
                    bottom: 0,
                    left: 0
                 }}>
                {this.props.children}
            </div>
        );
    }
    private _renderResizeHandle(resizeType : WindowResizeType) : React.ReactNode {
        if(this.props.window.settings.resizable && !this.props.window.maximized) {
            return (
                <div className={css(windowStyles.resize, resizeType)}
                     draggable
                     onDragStart={this._resizeDragStartHandler(resizeType)}
                     onDragEnd={this._onResizeDragEnd}>
                </div>
            );
        }
        return null;
    }
    render() {
        const { window, className } = this.props;
        const { draggable } = window.settings;
        return (
            <div className={css(windowStyles.root, { maximized: window.maximized })}
                style={{
                    borderWidth: window.settings.borderWidth
                }}
                onDragStart={draggable ? this._onDragStart : undefined}
                onDragEnd={draggable ? this._onDragEnd : undefined}
                ref={this._onRef}>
                {this._renderHeader()}
                {this._renderBody()}
                {this._renderResizeHandle(WindowResizeType.top)}
                {this._renderResizeHandle(WindowResizeType.right)}
                {this._renderResizeHandle(WindowResizeType.bottom)}
                {this._renderResizeHandle(WindowResizeType.left)}
                {this._renderResizeHandle(WindowResizeType.topRight)}
                {this._renderResizeHandle(WindowResizeType.topLeft)}
                {this._renderResizeHandle(WindowResizeType.bottomRight)}
                {this._renderResizeHandle(WindowResizeType.bottomLeft)}
            </div>
        );
    }
}

export { IWindowProps, Window }