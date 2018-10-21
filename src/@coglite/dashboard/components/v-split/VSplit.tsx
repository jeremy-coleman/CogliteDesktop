import { theme } from '@coglite/apphost';
import { css } from '@coglite/design-system';
import { observer } from 'mobx-react';
import * as React from 'react';
import { stylesheet } from 'typestyle';

import { IComponent, IViewFactory, IVSplit } from '../../types';
import { ComponentView } from '../ComponentView';


const vsplitStyles = stylesheet({
    root: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        splitter: {
            cursor: "ns-resize",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            backgroundColor: theme.palette.themeDark,
            left: 0,
            right: 0
        },
        splitterHandle: {
            position: "absolute",
            top: -2,
            right: 0,
            bottom: -2,
            left: 0,
            overflow: "hidden",
            backgroundColor: "transparent",
            color: theme.palette.themeDark,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            transition: "background-color 0.3s ease",
            selectors: {
                ":hover": {
                    backgroundColor: theme.palette.themeDark,
                    opacity: 0.5,
                },
                ".vsplit-icon": {
                    fontSize: '10px',
                    visibility: "hidden",
                    color: theme.palette.white
                },
                "&.active": {
                    backgroundColor: theme.palette.themeDark,
                    opacity: 1.0,
                    selectors: {
                        ".vsplit-icon": {
                            visibility: "visible"
                        }
                    }
                }
            }
        },
        topPane: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            overflow: "hidden"
        },
        topContent: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "auto"
        },
        bottomPane: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            overflow: "hidden"
        },
        bottomContent: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "auto"
        }
    
})


interface IVSplitProps {
    vsplit: IVSplit;
    className?: string;
}


@observer
class VSplit extends React.Component<IVSplitProps, any> {
    private _ref : HTMLElement;
    private _splitterRef : HTMLElement;
    private _resize = (e : MouseEvent) => {
        const minItemHeight = this.props.vsplit.minItemHeight;
        const bounds = this._ref.getBoundingClientRect();
        const splitterBounds = this._splitterRef.getBoundingClientRect();
        const max = bounds.height - splitterBounds.height - minItemHeight;
        let splitterPos = e.clientY - bounds.top;
        if(splitterPos <= minItemHeight) {
            splitterPos = minItemHeight;
        } else if(splitterPos >= max) {
            splitterPos = max;
        }
        const offset = splitterPos / bounds.height;
        this.props.vsplit.setOffset(offset);
    }
    private _onDocumentMouseUp = (e : MouseEvent) => {
        this._ref.ownerDocument.removeEventListener("mousemove", this._onDocumentMouseMove);
        this._ref.ownerDocument.removeEventListener("mouseup", this._onDocumentMouseUp);
        this.props.vsplit.setSplitActive(false);
    }
    private _onDocumentMouseMove = (e : MouseEvent) => {
        e.preventDefault();
        this._resize(e);
    }
    private _onSplitterMouseDown = (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        this._ref.ownerDocument.addEventListener("mousemove", this._onDocumentMouseMove);
        this._ref.ownerDocument.addEventListener("mouseup", this._onDocumentMouseUp);
        this.props.vsplit.setSplitActive(true);
    }
    private _onRef = (ref : HTMLElement) => {
        this._ref = ref;
    }
    private _onSplitterRef = (ref : HTMLElement) => {
        this._splitterRef = ref;
    }
    private _renderTopPane() : React.ReactNode {
        const { vsplit } = this.props;
        return (
            <div className={vsplitStyles.topPane}
                    style={{ height: vsplit.topHeight }}>
                <div className={vsplitStyles.topContent}>
                    <ComponentView component={vsplit.top} />
                </div>
            </div>
        )
    }
    private _renderSplitter() : React.ReactNode {
        const { vsplit } = this.props;
        //Icon iconName="GripperBarHorizontal" className="vsplit-icon" />
        return (
            <div className={css(vsplitStyles.splitter, { active: vsplit.splitActive })}
                    onMouseDown={this._onSplitterMouseDown}
                    style={{ top: vsplit.topHeight, height: vsplit.splitterHeight }}
                    ref={this._onSplitterRef}>
                <div className={css(vsplitStyles.splitterHandle, { active: vsplit.splitActive })}>
                {/*<DragIndicator/>*/}
                </div>
            </div>
        );
    }
    private _renderBottomPane() : React.ReactNode {
        const { vsplit } = this.props;
        return (
            <div className={vsplitStyles.bottomPane}
                style={{ height: vsplit.bottomHeight }}>
                <div className={vsplitStyles.bottomContent}>
                    <ComponentView component={vsplit.bottom} />
                </div>
            </div>
        );
    }
    render() {
        const { vsplit, className } = this.props;
        return (
            <div className={vsplitStyles.root} ref={this._onRef}>
                {this._renderTopPane()}
                {this._renderSplitter()}
                {this._renderBottomPane()}
            </div>
        );
    }
}


class VSplitViewFactory implements IViewFactory {
    className : string = undefined;
    createView(comp : IComponent) : React.ReactNode {
        return <VSplit vsplit={comp as IVSplit} className={this.className} />;
    }
}


export { IVSplitProps, VSplit, VSplitViewFactory }