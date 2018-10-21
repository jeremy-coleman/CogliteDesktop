import { css } from '@coglite/design-system';
import Add from '@material-ui/icons/Add';
import Close from '@material-ui/icons/Close';
import { observer } from 'mobx-react';
import * as React from 'react';
import { classes } from 'typestyle';

import { removeComponent } from '../../actions';
import { IComponent, IStack, IViewFactory, IWindow } from '../../types';
import { stackStyles } from './styles';




interface IStackProps {
    stack: IStack;
    className?: string;
    window?: IWindow;
    first?: boolean;
    last?: boolean;
}


// <Icon className={stackStyles.actionIcon} iconName="ChromeClose" />
//-- THIS IS ONLY THE END X ON THE FAR RIGHT SIDE, STYLING THE <CLOSE/> DOESNT EFFECT ANYTHING ELSE --//


@observer
class StackCloseAction extends React.Component<IStackProps, any> {
    private _onRemoveConfirm = () => {
        this.props.stack.close();
    }
    private _onClick = () => {
        if(this.props.stack.windowCount > 1) {
            removeComponent({ component: this.props.stack, saveHandler: this._onRemoveConfirm });
        } else {
            this.props.stack.close();
        }
    }

    render() {
        const { stack, className } = this.props;
        if(!stack.closeDisabled) {
            return (
                <i 
                        //type="button"
                        style={{ width: stack.headerHeight }}
                        className={classes(stackStyles.action, "close-action")}
                        title="Close all Tabs"
                        onClick={this._onClick}>
                   <Close/>
                </i>
            );
        }
        return null;
    }
}

// -------- this is the toolbar that holds the tabs and the X on the right -----------//

@observer
class StackActionBar extends React.Component<IStackProps, any> {
    render() {
        return (
            <div className={stackStyles.actionBar} style={{ position: "absolute", top: 0, right: 0, bottom: 0 }}>
                <StackCloseAction {...this.props} />
            </div>
        )
    }
}



@observer
class StackTabTitle extends React.Component<IStackProps, any> {
    render() {
        return (
            <span className={classes(stackStyles.tabTitleContainer, stackStyles.tabTitle) }>
                    {this.props.window.title}
            </span>
        );
    }
}

@observer
class StackTabCloseAction extends React.Component<IStackProps, any> {
    private _onMouseDown = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    }
    private _onClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        this.props.window.close();
    }
    render() {
        const {stack} = this.props
        if(this.props.window && !this.props.window.closeDisabled) {
            return (
                <span
                    style={{ width: stack.headerHeight }}
                    className={classes(stackStyles.action, stackStyles.tabAction, "close-action", this.props.window.active ? 'active' : '')}
                    title={`Close ${this.props.window.title || "Tab"}`}
                    onMouseDown={this._onMouseDown}
                   onClick={this._onClick}
                >
                    <Close/>
                </span>
            );
        }
        return null;
    }
}

class StackTabActionBar extends React.Component<IStackProps, any> {
    render() {
        return (
            <div className={stackStyles.tabAction}>
                <StackTabCloseAction {...this.props} />
            </div>
        );
    }
}

@observer
class StackTab extends React.Component<IStackProps, any> {
    private _ref : HTMLElement;
    private _dragOverStart : number;
    private _onClick = () => {
        this.props.stack.setActive(this.props.window);
    }
    private _onDragStart = (e : React.DragEvent<HTMLElement>) => {
        e.stopPropagation();
        const transferText = String(JSON.stringify(this.props.window.config));
        e.dataTransfer.setData("text", transferText);
        window.setTimeout(() => {
            this.props.window.dragStart();
        }, 1);
    }
    private _onDragEnd = (e : React.DragEvent<HTMLElement>) => {
        delete this._dragOverStart;
        this.props.window.dragEnd();
    }
    private _onDragOver = (e : React.DragEvent<HTMLElement>) => {
        const db = this.props.stack.dashboard;
        const drag = db ? db.drag : undefined;
        if(drag) {
            e.stopPropagation();
            if(drag !== this.props.window) {
                e.preventDefault();
                try {
                    e.dataTransfer.dropEffect = "move";
                } catch(ex) {}
            }
        } else {
            if(!this.props.window.active) {
                if(!this._dragOverStart) {
                    this._dragOverStart = new Date().getTime();
                } else {
                    const diff = new Date().getTime() - this._dragOverStart;
                    if(diff >= 600) {
                        this.props.window.activate();
                        delete this._dragOverStart;
                    }
                }
            }
        }
    }

    private _onDragLeave = (e : React.DragEvent<HTMLElement>) => {
        if(e.relatedTarget !== this._ref && !this._ref.contains(e.relatedTarget as HTMLElement)) {
            delete this._dragOverStart;
        }
    }

    private _onDrop = (e : React.DragEvent<HTMLElement>) => {
        delete this._dragOverStart;
        e.stopPropagation();
        e.preventDefault();
        this.props.stack.dropWindow(this.props.window);
    }

    private _onRef = (ref : HTMLElement) => {
        this._ref = ref;
    }
    render() {
        return (
            <div className={classes(stackStyles.tab,
                this.props.window.active ? 'active' : '',
                this.props.first ? 'first' : '',
                this.props.last ? 'last' : ''
                )}
                 role="tab"
                 id={`${this.props.window.id}-tab`}
                 aria-controls={`${this.props.window.id}-tab-panel`}
                 title={this.props.window.title}
                 ref={this._onRef}
                 onClick={this._onClick}
                 draggable={true}
                 onDragStart={this._onDragStart}
                 onDragEnd={this._onDragEnd}
                 onDragOver={this._onDragOver}
                 onDrop={this._onDrop}
                 onDragLeave={this._onDragLeave}>
                <StackTabTitle {...this.props} />
                <StackTabActionBar {...this.props} />
            </div>
        );
    }
}

@observer
class StackTabPanel extends React.Component<IStackProps, any> {
    render() {
        const active = this.props.window.active;
        let style : React.CSSProperties = {
            position: "absolute",
            top: 0,
            left: 0,
            overflow: "hidden"
        };
        if(active) {
            style.right = 0;
            style.bottom = 0;
        } else {
            style.width = 0;
            style.height = 0;
        }
        return (
            <div className={css(stackStyles.tabPanel, { active: active })}
                 style={style}
                 role="tabpanel"
                 id={`${this.props.window.id}-tab-panel`}>
            </div>
        );
    }
}

@observer
class StackAddAction extends React.Component<IStackProps, any> {
    private _onClick = () => {
        this.props.stack.addNew({ makeActive: true });
    }
    render() {
        const { stack, className } = this.props;
        if(stack.addApp) {
            return (
                <button type="button"
                        title="Add Tab"
                        className={stackStyles.addAction}
                        onClick={this._onClick}
                        style={{ width: stack.headerHeight }}>
                    <Add/>
                </button>
            );
        }
        return null;
    }
}

@observer
class StackTabBar extends React.Component<IStackProps, any> {
    private _onDragOver = (e : React.DragEvent<HTMLElement>) => {
        const stack = this.props.stack;
        const db = stack.dashboard;
        const drag = db ? db.drag : undefined;
        if(drag && (drag.parent !== stack || (stack.windowCount > 1 && drag !== stack.last))) {
            e.stopPropagation();
            e.preventDefault();
            try {
                e.dataTransfer.dropEffect = "move";
            } catch(ex) {}
        }
    }
    private _onDrop = (e : React.DragEvent<HTMLElement>) => {
        e.stopPropagation();
        e.preventDefault();
        this.props.stack.dropWindow();
    }
    render() {
        const tabs = this.props.stack.windows.map((w, idx) => {
            return <StackTab key={w.id} stack={this.props.stack} window={w} first={idx === 0} last={idx === this.props.stack.windowCount - 1} />;
        });
        return (
            <div className={stackStyles.tabBar} role="tablist" onDragOver={this._onDragOver} onDrop={this._onDrop}>
                {tabs}
                <StackAddAction {...this.props} />
            </div>
        );
    }
}

@observer
class StackHeader extends React.Component<IStackProps, any> {
    render() {
        return (
            <div className={stackStyles.header} style={{ height: this.props.stack.headerHeight }}>
                <StackTabBar {...this.props} />
                <StackActionBar {...this.props} />
            </div>
        );
    }
}

const uselessDropHandler = () => {};

@observer
class StackDragOverlay extends React.Component<IStackProps, any> {
    private _overlayRef : HTMLElement;
    private _onDragLeave = (e : React.DragEvent<HTMLElement>) => {
        const { stack } = this.props;
        const drag = stack.dashboard.drag;
        if(drag) {
            drag.setDragState({ pos: null, over: null });
        }
        this._dropHandler = uselessDropHandler;
    }
    private _onDrop = (e : React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        this._dropHandler();
        this.props.stack.dragEnd();
    }
    private _dropHandler = uselessDropHandler;
    private _dropLeft = () => {
        this.props.stack.splitLeft(this.props.stack.dashboard.drag);
    }
    private _setDropZoneLeft(width : number, height : number) {
        const { stack } = this.props;
        const drag = stack.dashboard.drag;
        this._dropHandler = this._dropLeft;
        const styles : React.CSSProperties = {
            top: 0,
            left: 0,
            width: Math.floor(width / 2),
            height: height
        };
        drag.setDragState({ feedbackStyles: styles, over: stack });
    }
    private _dropRight = () => {
        this.props.stack.splitRight(this.props.stack.dashboard.drag);
    }
    private _setDropZoneRight(width : number, height : number) {
        const { stack } = this.props;
        const drag = stack.dashboard.drag;
        this._dropHandler = this._dropRight;
        const left = Math.floor(width / 2);
        const styles : React.CSSProperties = {
            top: 0,
            left: left,
            width: width - left,
            height: height
        };
        drag.setDragState({ feedbackStyles: styles, over: stack });
    }
    private _dropTop = () => {
        this.props.stack.splitTop(this.props.stack.dashboard.drag);
    }
    private _setDropZoneTop(width : number, height : number) {
        const { stack } = this.props;
        const drag = stack.dashboard.drag;
        this._dropHandler = this._dropTop;
        const styles : React.CSSProperties = {
            top: 0,
            left: 0,
            width: width,
            height: Math.floor(height / 2)
        };
        drag.setDragState({ feedbackStyles: styles, over: stack });
    }
    private _dropBottom = () => {
        this.props.stack.splitBottom(this.props.stack.dashboard.drag);
    }
    private _setDropZoneBottom(width : number, height : number) {
        const { stack } = this.props;
        const drag = stack.dashboard.drag;
        this._dropHandler = this._dropBottom;
        const top = Math.floor(height / 2);
        const styles : React.CSSProperties = {
            top: top,
            left: 0,
            width: width,
            height: height - top
        };
        drag.setDragState({ feedbackStyles: styles, over: stack });
    }
    private _dropAdd = () => {
        this.props.stack.add(this.props.stack.dashboard.drag as IWindow, { makeActive: true });
    }
    private _setDropZoneAdd() {
        this._dropHandler = this._dropAdd;
    }
    private _onDragOver = (e : React.DragEvent<HTMLElement>) => {
        const stack = this.props.stack;
        const db = stack.dashboard;
        const drag = db ? db.drag : undefined;
        if(drag) {
            e.stopPropagation();
            if((drag.parent !== stack && stack.windowCount > 0) || stack.windowCount > 1) {
                e.preventDefault();
                const bounds = this._overlayRef.getBoundingClientRect();
                const zoneWidth = Math.floor(bounds.width / 2);
                const leftRightZoneWidth = Math.floor(bounds.width / 6);
                const topBottomZoneHeight = Math.floor(bounds.height / 2);
                if(e.clientX >= bounds.left && e.clientX <= bounds.left + leftRightZoneWidth) {
                    this._setDropZoneLeft(bounds.width, bounds.height);
                } else if(e.clientX >= bounds.left + bounds.width - leftRightZoneWidth && e.clientX <= bounds.left + bounds.width) {
                    this._setDropZoneRight(bounds.width, bounds.height);
                } else if(e.clientY >= bounds.top && e.clientY <= bounds.top + topBottomZoneHeight) {
                    this._setDropZoneTop(bounds.width, bounds.height);
                } else {
                    this._setDropZoneBottom(bounds.width, bounds.height);
                }
            } else if(stack.windowCount === 0) {
                e.preventDefault();
                this._setDropZoneAdd();
            }
        }
    }
    private _onOverlayRef = (ref : HTMLElement) => {
        this._overlayRef = ref;
    }
    render() {
        const { stack } = this.props;
        const headerHeight: React.CSSProperties = {top: stack.headerHeight}
        const drag = stack.dashboard ? stack.dashboard.drag : undefined;
        if(drag) {
            const feedbackStyles : React.CSSProperties = drag.dragState.over === stack ? drag.dragState.feedbackStyles : {
                top: 0,
                left: 0,
                height: 0,
                width: 0
            };
            return [
                <div key="overlay"
                     className={stackStyles.dragOverlay}
                     onDragOver={this._onDragOver}
                     onDrop={this._onDrop}
                     onDragLeave={this._onDragLeave}
                     ref={this._onOverlayRef}
                     style={{...headerHeight}}>
                </div>,
                <div key="feedbackContainer"
                     className={stackStyles.dragFeedbackContainer}
                     style={{ top: stack.headerHeight }}>
                    <div className={css(stackStyles.dragFeedback, drag.dragState.pos)} style={{...feedbackStyles}}>
                    </div>
                </div>
            ];
        }
        return null;
    }
}

@observer
class StackBody extends React.Component<IStackProps, any> {
    render() {
        const panels = this.props.stack.windows.map(w => {
            return <StackTabPanel key={w.id} stack={this.props.stack} window={w} />;
        });
        return (
            <div className={stackStyles.body} style={{ top: this.props.stack.headerHeight }}>
                {panels}
            </div>
        );
    }
}

@observer
class Stack extends React.Component<IStackProps, any> {
    render() {
        return (
            <div id={this.props.stack.id} className={stackStyles.root}>
                <StackDragOverlay {...this.props} />
                <StackHeader {...this.props} />
                <StackBody {...this.props} />
            </div>
        );
    }
}



class StackViewFactory implements IViewFactory {
    className: string = undefined;
    
    createView(comp : IComponent) : React.ReactNode {
        return <Stack stack={comp as IStack} className={this.className} />
    }
}


export { IStackProps, Stack , StackViewFactory}