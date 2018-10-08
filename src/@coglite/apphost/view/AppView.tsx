import { CommandBar, css, ICommandBar, ICommandBarProps } from 'office-ui-fabric-react';
import * as React from 'react';

import { getClassNames, IAppViewClassNames } from './AppView.classNames';
import { getStyles, IAppViewStyles } from './AppView.styles';




interface IAppViewProps {
    commandBarProps?: ICommandBarProps;
    onRenderCommandBar?: (props : IAppViewProps) => ICommandBar;
    root?: boolean;
    styles?: IAppViewStyles;
    className?: string;
}

interface IAppView {
    commandBar: ICommandBar;
    remeasure() : void;
}

class AppView extends React.Component<IAppViewProps, any> {
    private _classNames : IAppViewClassNames;
    private _commandBar : ICommandBar;
    protected get hasCommandBar() {
        const renderer = this.props.onRenderCommandBar;
        const props = this.props.commandBarProps;
        return renderer || (props &&
                ((props.items && props.items.length > 0) ||
                (props.farItems && props.farItems.length > 0))) ? true : false;
    }
    private _onCommandBarRef = (commandBar : ICommandBar) => {
        this._commandBar = commandBar;
    }
    get commandBar() : ICommandBar {
        return this._commandBar;
    }
    remeasure(): void {
        if(this._commandBar) {
            this._commandBar.remeasure();
        }
    }

    protected _onRenderCommandBar() : React.ReactNode {
        if(this.hasCommandBar) {
            let commandBar;
            if(this.props.onRenderCommandBar) {
                commandBar = this.props.onRenderCommandBar(this.props);
            } else {
                commandBar = <CommandBar {...this.props.commandBarProps} componentRef={this._onCommandBarRef} />;
            }
            return (
                <div className={css(this._classNames.menuContainer, { rootView: this.props.root })}>
                    {commandBar}
                </div>
            );
        }
        return null;
    }
    protected _onRenderMain() : React.ReactNode {
        return (
            <div role="main" className={css(this._classNames.main, { hasMenu: this.hasCommandBar, rootView: this.props.root })}>
                {this.props.children}
            </div>
        );
    }
    render() {
        this._classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={css(this._classNames.root, { rootView: this.props.root})}>
                {this._onRenderCommandBar()}
                {this._onRenderMain()}
            </div>
        )
    }
}

export { IAppViewProps, AppView, IAppView }