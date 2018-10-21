import { css } from '@coglite/design-system';
import { observer } from 'mobx-react';
import * as React from 'react';
import { stylesheet } from 'typestyle';

import { IComponent, IHSplit, IViewFactory } from '../../types';
import { ComponentView } from '../ComponentView';


const hsplitStyles = stylesheet({
    root: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        splitter: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 0,
            bottom: 0,
            backgroundColor: 'black'
        },
        splitterHandle: {
            cursor: "ew-resize",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: -2,
            right: -2,
            overflow: "hidden",
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            transition: "background-color 0.3s ease",
            $nest: {
                ":hover": {
                    backgroundColor: 'black',
                    opacity: 0.5,
                },
                ".hsplit-icon": {
                    fontSize: '10px',
                    visibility: "hidden",
                    color: 'white'
                },
                "&.active": {
                    backgroundColor: 'black',
                    opacity: 1.0,
                    $nest: {
                        ".hsplit-icon": {
                            visibility: "visible"
                        }
                    }
                }
            }
        },
        leftPane: {
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            overflow: "hidden"
        },
        leftContent: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "auto"
        },
        rightPane: {
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            overflow: "hidden"
        },
        rightContent: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "auto"
        }
})



interface IHSplitProps {
    hsplit: IHSplit;
    className?: string;
}

@observer
class HSplit extends React.Component<IHSplitProps, any> {
    private _ref : HTMLElement;
    private _splitterRef : HTMLElement;
    private _resize(e : MouseEvent) {
        const minItemWidth = this.props.hsplit.minItemWidth;
        const bounds = this._ref.getBoundingClientRect();
        const splitterBounds = this._splitterRef.getBoundingClientRect();
        const max = bounds.width - splitterBounds.width - minItemWidth;
        let splitterPos = e.clientX - bounds.left;
        if(splitterPos <= minItemWidth) {
            splitterPos = minItemWidth;
        } else if(splitterPos >= max) {
            splitterPos = max;
        }
        const offset = splitterPos / bounds.width;
        this.props.hsplit.setOffset(offset);
    }
    private _onDocumentMouseUp = (e : MouseEvent) => {
        this._ref.ownerDocument.removeEventListener("mousemove", this._onDocumentMouseMove);
        this._ref.ownerDocument.removeEventListener("mouseup", this._onDocumentMouseUp);
        this.props.hsplit.setSplitActive(false);
    }
    private _onDocumentMouseMove = (e : MouseEvent) => {
        e.preventDefault();
        this._resize(e);
    }
    private _onSplitterMouseDown = (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        this._ref.ownerDocument.addEventListener("mousemove", this._onDocumentMouseMove);
        this._ref.ownerDocument.addEventListener("mouseup", this._onDocumentMouseUp);
        this.props.hsplit.setSplitActive(true);
    }
    private _onRef = (ref : HTMLElement) => {
        this._ref = ref;
    }
    private _onSplitterRef = (ref : HTMLElement) => {
        this._splitterRef = ref;
    }
    private _renderLeftPane() : React.ReactNode {
        const { hsplit } = this.props;
        return (
            <div className={hsplitStyles.leftPane}
                style={{ width: hsplit.leftWidth }}>
                <div className={hsplitStyles.leftContent}>
                    <ComponentView component={hsplit.left} />
                </div>
            </div>
        );
    }

    //<Icon iconName="GripperBarVertical" className="hsplit-icon" />
    private _renderSplitter() : React.ReactNode {
        const { hsplit } = this.props;
        return (
            <div className={css(hsplitStyles.splitter, { active: hsplit.splitActive })}
                onMouseDown={this._onSplitterMouseDown}
                style={{ left: hsplit.leftWidth, width: hsplit.splitterWidth }}
                ref={this._onSplitterRef}>
                <div className={css(hsplitStyles.splitterHandle, { active: hsplit.splitActive })}>
                    {/*<DragHandle/>*/}
                </div>
            </div>
        )
    }
    private _renderRightPane() : React.ReactNode {
        const { hsplit } = this.props;
        return (
            <div className={hsplitStyles.rightPane}
                    style={{ left: hsplit.leftWidth + hsplit.splitterWidth, width: hsplit.rightWidth }}>
                <div className={hsplitStyles.rightContent}>
                    <ComponentView component={hsplit.right} />
                </div>
            </div>
        )
    }
    render() {
        const { className } = this.props;   
        return (
            <div className={hsplitStyles.root} ref={this._onRef}>
                {this._renderLeftPane()}
                {this._renderSplitter()}
                {this._renderRightPane()}
            </div>
        );
    }
}


class HSplitViewFactory implements IViewFactory {
    className : string = undefined;
    createView(comp : IComponent) : React.ReactNode {
        return <HSplit hsplit={comp as IHSplit} className={this.className} />;
    }
}


export { IHSplitProps, HSplit, HSplitViewFactory }