import { IEventTarget, SyncComponent } from '@coglite/apphost';
import { observer } from 'mobx-react';
import { css } from 'office-ui-fabric-react';
import * as React from 'react';

import { ComponentRemoveStore } from '../../stores/ComponentRemoveStore';
import { IDashboard } from '../../types/IDashboard';
import { IWindowManager } from '../../types/IWindowManager';
import { AppPortalManager } from '../AppPortalManager';
import { ComponentRemoveDialog } from '../ComponentRemove';
import { ComponentView } from '../ComponentView';
import { getClassNames } from './Dashboard.classNames';
import { getStyles, IDashboardStyles } from './Dashboard.styles';

//import { SyncSpinnerView as Sync } from "@coglite/apphost/component/Sync";

interface IDashboardProps {
    dashboard: IDashboard;
    className?: string;
    hidden?: boolean;
    host?: IEventTarget;
    styles?: IDashboardStyles;
}

interface IDashboardOverlayProps {
    dashboard: IDashboard;
    className?: string;
}

@observer
class DashboardBlockOverlay extends React.Component<IDashboardOverlayProps, any> {
    render() {
        if(this.props.dashboard.blockSource) {
            return (
                <div className={css(this.props.className, this.props.dashboard.blockSource.type)}
                     style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, zIndex: 2 }}>
                </div>
            );
        }
        return null;
    }
}

class DashboardPortals extends React.Component<IDashboardProps, any> {
    private _ref : HTMLDivElement;
    private _onRef = (ref : HTMLDivElement) => {
        this._ref = ref;
    }
    componentDidMount() {
        this.props.dashboard.setPortalManager(new AppPortalManager(this._ref));
    }
    componentWillReceiveProps(nextProps : IDashboardProps) {
        if(nextProps.dashboard !== this.props.dashboard) {
            const currentPortalManager = this.props.dashboard.portalManager;
            if(currentPortalManager) {
                currentPortalManager.destroy();
            }
            this.props.dashboard.setPortalManager(new AppPortalManager(this._ref));
        }
    }
    render() {
        return (
            <div ref={this._onRef}></div>
        );
    }
}

@observer
class DashboardView extends React.Component<IDashboardProps, any> {
    private _ref : HTMLDivElement;
    private _onRef = (ref : HTMLDivElement) => {
        this._ref = ref;
    }
    private _resizeToViewport() {
        if(this._ref) {
            const bounds = this._ref.getBoundingClientRect();
            this.props.dashboard.resize(bounds.width, bounds.height);
        }
    }
    private _onHostResize = () => {
        this._resizeToViewport();
    }
    private _addHostListener(host : IEventTarget) {
        if(host) {
            host.addEventListener("resize", this._onHostResize);
        }
    }
    private _removeHostListener(host : IEventTarget) {
        if(host) {
            host.removeEventListener("resize", this._onHostResize);
        }
    }
    componentDidMount() {
        this._addHostListener(this.props.host);
        this._resizeToViewport();
    }
    componentWillUnmount() {
        this._removeHostListener(this.props.host);
    }
    componentWillReceiveProps(nextProps : IDashboardProps) {
        if(nextProps.host !== this.props.host) {
            this._removeHostListener(this.props.host);
            this._addHostListener(nextProps.host);
        }
    }
    render() {
        const { dashboard, styles, className } = this.props;
        const classNames = getClassNames(getStyles(null, styles), className);
        const component = dashboard.component;
        return (
            <div id={this.props.dashboard.id}
                className={css(classNames.root, { hidden: this.props.hidden })}
                ref={this._onRef}>
                <DashboardBlockOverlay dashboard={this.props.dashboard} className={classNames.overlay} />
                <ComponentRemoveDialog remove={ComponentRemoveStore} />
                <div className={css(classNames.content, { "overflow": component && component.isWindowManager && (component as IWindowManager).isRequiresOverflow ? true : false })}>
                    <DashboardPortals {...this.props} />
                    <ComponentView component={component} />
                </div>
            </div>
        );
    }
    componentDidUpdate() {
        this._resizeToViewport();
    }
}

class DashboardContainer extends React.Component<IDashboardProps, any> {
    private _onRenderDone = () => {
        return <DashboardView {...this.props} />;
    }
    render() {
        return <SyncComponent sync={this.props.dashboard.sync}
                     syncLabel="Loading Dashboard..."
                     onRenderDone={this._onRenderDone} />;
    }
}

export { IDashboardProps, DashboardContainer, DashboardView }