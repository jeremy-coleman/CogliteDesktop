import { observer } from 'mobx-react';
import { css, Icon } from 'office-ui-fabric-react';
import * as React from 'react';

import { IVSplit } from '../../types/ISplit';
import { ComponentView } from '../ComponentView';
import { getClassNames, IVSplitClassNames } from './VSplit.classNames';
import { getStyles, IVSplitStyles } from './VSplit.styles';

interface IVSplitProps {
    vsplit: IVSplit;
    styles?: IVSplitStyles;
    className?: string;
}

@observer
class VSplit extends React.Component<IVSplitProps, any> {
    private _classNames : IVSplitClassNames;
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
            <div className={this._classNames.topPane}
                    style={{ height: vsplit.topHeight }}>
                <div className={this._classNames.topContent}>
                    <ComponentView component={vsplit.top} />
                </div>
            </div>
        )
    }
    private _renderSplitter() : React.ReactNode {
        const { vsplit } = this.props;
        return (
            <div className={css(this._classNames.splitter, { active: vsplit.splitActive })}
                    onMouseDown={this._onSplitterMouseDown}
                    style={{ top: vsplit.topHeight, height: vsplit.splitterHeight }}
                    ref={this._onSplitterRef}>
                <div className={css(this._classNames.splitterHandle, { active: vsplit.splitActive })}>
                    <Icon iconName="GripperBarHorizontal" className="vsplit-icon" />
                </div>
            </div>
        );
    }
    private _renderBottomPane() : React.ReactNode {
        const { vsplit } = this.props;
        return (
            <div className={this._classNames.bottomPane}
                style={{ height: vsplit.bottomHeight }}>
                <div className={this._classNames.bottomContent}>
                    <ComponentView component={vsplit.bottom} />
                </div>
            </div>
        );
    }
    render() {
        const { vsplit, styles, className } = this.props;
        this._classNames = getClassNames(getStyles(null, styles), className);
        return (
            <div className={this._classNames.root} ref={this._onRef}>
                {this._renderTopPane()}
                {this._renderSplitter()}
                {this._renderBottomPane()}
            </div>
        );
    }
}

export { IVSplitProps, VSplit }