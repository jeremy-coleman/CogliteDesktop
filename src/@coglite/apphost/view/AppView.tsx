import { CommandBar, ICommandBar, ICommandBarProps } from 'office-ui-fabric-react';
import * as React from 'react';

import {css} from '@coglite/design-system'

//import { getClassNames, IAppViewClassNames } from './AppView.classNames';
//import { getStyles, IAppViewStyles } from './AppView.styles';

import {stylesheet} from 'typestyle'

var appViewStyles = stylesheet({
    root: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "hidden"
        },

    menuContainer: {
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            height: 40,
            background: 'black',
            zIndex: 20000,
            //ignoring all the other shit cuz wtf
    },

    main: {
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            overflow: "auto",
            $nest: {
                "&.hasMenu": {
                    top: 40
                }
            }
        }
})


interface IAppViewProps {
    commandBarProps?: ICommandBarProps;
    onRenderCommandBar?: (props : IAppViewProps) => ICommandBar;
    root?: boolean;
    //styles?: any;
    className?: string;
}

interface IAppView {
    commandBar: ICommandBar;
    remeasure() : void;
}

class AppView extends React.Component<IAppViewProps, any> {
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
                <div className={css(appViewStyles.menuContainer, { rootView: this.props.root })}>
                    {commandBar}
                </div>
            );
        }
        return null;
    }

    protected _onRenderMain() : React.ReactNode {
        return (
            <div role="main" className={css(appViewStyles.main, { hasMenu: this.hasCommandBar, rootView: this.props.root })}>
                {this.props.children}
            </div>
        );
    }
    
    render() {
        return (
            <div className={css(appViewStyles.root, { rootView: this.props.root})}>
                {this._onRenderCommandBar()}
                {this._onRenderMain()}
            </div>
        )
    }
}

export { IAppViewProps, AppView, IAppView }