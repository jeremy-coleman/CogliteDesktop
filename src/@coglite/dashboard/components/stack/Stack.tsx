import { observer } from 'mobx-react';
import { css, Icon } from 'office-ui-fabric-react';
import * as React from 'react';

import { removeComponent } from '../../actions';
import { IStack } from '../../types/IStack';
import { IWindow } from '../../types/IWindow';
import { getClassNames } from './Stack.classNames';
import { getStyles, IStackStyles } from './Stack.styles';

import Close from '@material-ui/icons/Close'

interface IStackProps {
    stack: IStack;
    className?: string;
    styles?: IStackStyles;
}


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
// <Icon className={classNames.actionIcon} iconName="ChromeClose" />

    render() {
        const { stack, styles, className } = this.props;
        if(!stack.closeDisabled) {
            const classNames = getClassNames(getStyles(null, styles), className);
            return (
                <button type="button"
                        style={{ width: stack.headerHeight }}
                        className={css(classNames.action, "close-action")}
                        title="Close all Tabs"
                        onClick={this._onClick}>
                   <Close/>
                </button>
            );
        }
        return null;
    }
}

@observer
class StackActionBar extends React.Component<IStackProps, any> {
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={classNames.actionBar} style={{ position: "absolute", top: 0, right: 0, bottom: 0 }}>
                <StackCloseAction {...this.props} />
            </div>
        )
    }
}

interface IStackWindowProps extends IStackProps {
    window: IWindow;
    first?: boolean;
    last?: boolean;
}

@observer
class StackTabTitle extends React.Component<IStackWindowProps, any> {
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={classNames.tabTitleContainer}>
                <div className={classNames.tabTitle}>
                    {this.props.window.title}
                </div>
            </div>
        );
    }
}

@observer
class StackTabCloseAction extends React.Component<IStackWindowProps, any> {
    private _onMouseDown = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    }
    private _onClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        this.props.window.close();
    }
    render() {
        if(this.props.window && !this.props.window.closeDisabled) {
            const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
            return (
                <button type="button" className={css(classNames.tabAction, "close-action", { active: this.props.window.active })}
                               title={`Close ${this.props.window.title || "Tab"}`}
                               onMouseDown={this._onMouseDown}
                               onClick={this._onClick}>
                    <Icon className={classNames.tabActionIcon} iconName="ChromeClose" />
                </button>
            );
        }
        return null;
    }
}

class StackTabActionBar extends React.Component<IStackWindowProps, any> {
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={classNames.tabActionBar}>
                <StackTabCloseAction {...this.props} />
            </div>
        );
    }
}

@observer
class StackTab extends React.Component<IStackWindowProps, any> {
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
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={css(classNames.tab, { active: this.props.window.active, first: this.props.first, last: this.props.last })}
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
class StackTabPanel extends React.Component<IStackWindowProps, any> {
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
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
            <div className={css(classNames.tabPanel, { active: active })}
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
        const { stack, styles, className } = this.props;
        if(stack.addApp) {
            const classNames = getClassNames(getStyles(null, styles), className);
            return (
                <button type="button"
                        title="Add Tab"
                        className={classNames.addAction}
                        onClick={this._onClick}
                        style={{ width: stack.headerHeight }}>
                    <Icon className="stack-add-action-icon" iconName="Add" />
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
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        const tabs = this.props.stack.windows.map((w, idx) => {
            return <StackTab key={w.id} stack={this.props.stack} window={w} first={idx === 0} last={idx === this.props.stack.windowCount - 1} />;
        });
        return (
            <div className={classNames.tabBar} role="tablist" onDragOver={this._onDragOver} onDrop={this._onDrop}>
                {tabs}
                <StackAddAction {...this.props} />
            </div>
        );
    }
}

@observer
class StackHeader extends React.Component<IStackProps, any> {
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={classNames.header} style={{ height: this.props.stack.headerHeight }}>
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
            const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
            const feedbackStyles : React.CSSProperties = drag.dragState.over === stack ? drag.dragState.feedbackStyles : {
                top: 0,
                left: 0,
                height: 0,
                width: 0
            };
            return [
                <div key="overlay"
                     className={classNames.dragOverlay}
                     onDragOver={this._onDragOver}
                     onDrop={this._onDrop}
                     onDragLeave={this._onDragLeave}
                     ref={this._onOverlayRef}
                     style={{...headerHeight}}>
                </div>,
                <div key="feedbackContainer"
                     className={classNames.dragFeedbackContainer}
                     style={{ top: stack.headerHeight }}>
                    <div className={css(classNames.dragFeedback, drag.dragState.pos)} style={{...feedbackStyles}}>
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
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        const panels = this.props.stack.windows.map(w => {
            return <StackTabPanel key={w.id} stack={this.props.stack} window={w} />;
        });
        return (
            <div className={classNames.body} style={{ top: this.props.stack.headerHeight }}>
                {panels}
            </div>
        );
    }
}

class Stack extends React.Component<IStackProps, any> {
    render() {
        let classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div id={this.props.stack.id} className={classNames.root}>
                <StackDragOverlay {...this.props} />
                <StackHeader {...this.props} />
                <StackBody {...this.props} />
            </div>
        );
    }
}

export { IStackProps, Stack }