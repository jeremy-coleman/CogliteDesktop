import { observer } from 'mobx-react';
import { css, Icon } from 'office-ui-fabric-react';
import * as React from 'react';

import { IHSplit } from '../../types/ISplit';
import { ComponentView } from '../ComponentView';
import { getClassNames, IHSplitClassNames } from './HSplit.classNames';
import { getStyles, IHSplitStyles } from './HSplit.styles';

interface IHSplitProps {
    hsplit: IHSplit;
    styles?: IHSplitStyles;
    className?: string;
}

@observer
class HSplit extends React.Component<IHSplitProps, any> {
    private _classNames : IHSplitClassNames;
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
            <div className={this._classNames.leftPane}
                style={{ width: hsplit.leftWidth }}>
                <div className={this._classNames.leftContent}>
                    <ComponentView component={hsplit.left} />
                </div>
            </div>
        );
    }
    private _renderSplitter() : React.ReactNode {
        const { hsplit } = this.props;
        return (
            <div className={css(this._classNames.splitter, { active: hsplit.splitActive })}
                onMouseDown={this._onSplitterMouseDown}
                style={{ left: hsplit.leftWidth, width: hsplit.splitterWidth }}
                ref={this._onSplitterRef}>
                <div className={css(this._classNames.splitterHandle, { active: hsplit.splitActive })}>
                    <Icon iconName="GripperBarVertical" className="hsplit-icon" />
                </div>
            </div>
        )
    }
    private _renderRightPane() : React.ReactNode {
        const { hsplit } = this.props;
        return (
            <div className={this._classNames.rightPane}
                    style={{ left: hsplit.leftWidth + hsplit.splitterWidth, width: hsplit.rightWidth }}>
                <div className={this._classNames.rightContent}>
                    <ComponentView component={hsplit.right} />
                </div>
            </div>
        )
    }
    render() {
        const { styles, className } = this.props;
        this._classNames = getClassNames(getStyles(null, styles), className);
        
        return (
            <div className={this._classNames.root} ref={this._onRef}>
                {this._renderLeftPane()}
                {this._renderSplitter()}
                {this._renderRightPane()}
            </div>
        );
    }
}

export { IHSplitProps, HSplit }