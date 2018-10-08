import { ContextualMenu, css, DirectionalHint, Icon, IContextualMenuItem } from 'office-ui-fabric-react';
import * as React from 'react';

import { getClassNames, INavigationViewClassNames } from './NavigationView.classNames';
import { getStyles, INavigationViewStyles } from './NavigationView.styles';

interface INavigationViewProps {
    title?: any;
    className?: string;
    menuOpen?: boolean;
    menuInline?: boolean;
    items?: IContextualMenuItem[];
    farItems?: IContextualMenuItem[];
    onMenuOpenChange?: (open : boolean) => void;
    styles?: INavigationViewStyles;
    root?: boolean;
}

interface INavigationViewMenuItemProps {
    item: IContextualMenuItem;
    open: boolean;
    classNames: INavigationViewClassNames;
    onClickItem?: (e : React.MouseEvent<HTMLElement>, item : IContextualMenuItem) => void;
}

interface INavigationViewMenuItemState {
    menuOpen: boolean;
}

class NavigationViewMenuItem extends React.Component<INavigationViewMenuItemProps, INavigationViewMenuItemState> {
    private _ref : HTMLDivElement;
    constructor(props : INavigationViewMenuItemProps) {
        super(props);
        this.state = { menuOpen: false };
    }
    private _onClick = (e) => {
        if(this.props.item.onClick) {
            this.props.item.onClick(e, this.props.item);
            if(this.props.onClickItem) {
                this.props.onClickItem(e, this.props.item);
            }
        } else if(this.props.item.subMenuProps) {
            this.setState({ menuOpen: !this.state.menuOpen });
        }
    }
    private _onRef = (ref : HTMLDivElement) => {
        this._ref = ref;
    }
    private _onDismiss = () => {
        this.setState({ menuOpen: false });
    }
    render() {
        const item = this.props.item;
        return (
            <div role="menuitem" className={this.props.classNames.menuItemContainer} ref={this._onRef}>
                <button key={item.key} 
                        type="button"
                        disabled={item.disabled}
                        className={css(this.props.classNames.menuItem, { active: item.checked })}
                        title={this.props.open ? undefined : item.name}
                        onClick={this._onClick}>
                    <div className={this.props.classNames.menuItemIconContainer}>
                        {item.iconProps ? <Icon  {...item.iconProps} /> : !this.props.open ? <div className={this.props.classNames.menuItemIconAlt}>{item.name}</div> : undefined}
                    </div>
                    {this.props.open && (
                        <div className={this.props.classNames.menuItemTitleContainer}>
                            {item.name}
                        </div>
                    )}
                </button>
                {this.state.menuOpen && (
                    <ContextualMenu {...this.props.item.subMenuProps} isBeakVisible={true} directionalHint={DirectionalHint.rightCenter} target={this._ref} onDismiss={this._onDismiss} />
                )}
            </div>
        );
    }
}

interface INavigationViewMenuControlProps {
    open: boolean;
    title?: string;
    classNames: INavigationViewClassNames;
    onClick?: (e : React.MouseEvent<HTMLElement>) => void;
}

class NavigationViewMenuControl extends React.Component<INavigationViewMenuControlProps, any> {
    render() {
        return (
            <button type="button"
                    className={this.props.classNames.menuItem}
                    onClick={this.props.onClick}
                    title={this.props.open ? "Close Menu" : "Open Menu"}>
                <div className={this.props.classNames.menuItemIconContainer}>
                    <Icon iconName="GlobalNavButton" />
                </div>
                {this.props.open && (
                    <div className={this.props.classNames.menuItemTitleContainer}>
                        {this.props.title}
                    </div>
                )}
            </button>
        );
    }
}

interface INavigationViewState {
    menuOpen?: boolean;
    menuTransition?: boolean;
    mainTransition?: boolean;
}

class NavigationView extends React.Component<INavigationViewProps, INavigationViewState> {
    protected _classNames : INavigationViewClassNames;
    constructor(props : INavigationViewProps) {
        super(props);
        this.state = { menuOpen: this.props.menuOpen !== undefined ? this.props.menuOpen : false, menuTransition: false, mainTransition: false }
    }
    componentWillReceiveProps(nextProps : INavigationViewProps) {
        if(nextProps.menuOpen !== undefined && nextProps.menuOpen !== this.state.menuOpen) {
            this.menuOpen = nextProps.menuOpen;
        }
    }
    get menuOpen() {
        return this.state.menuOpen;
    }
    set menuOpen(value : boolean) {
        this.setState({ menuOpen: value, menuTransition: true, mainTransition: this.props.menuInline ? true : false });
    }
    private _onMainMouseDown = () => {
        if(this.menuOpen) {
            this.menuOpen = false;
        }
    }
    private _onClickControl = () => {
        this.menuOpen = !this.menuOpen;
    }
    protected _renderMenuControl() : React.ReactNode {
        return <NavigationViewMenuControl open={this.state.menuOpen}
                                          title={this.props.title}
                                          classNames={this._classNames}
                                          onClick={this._onClickControl} />;
    }
    protected _onMenuItemClicked = (e, item) => {

    }
    protected _renderMenuItem = (item : IContextualMenuItem, idx?: number) : React.ReactNode => {
        return <NavigationViewMenuItem item={item}
                                       key={item.key}
                                       open={this.state.menuOpen}
                                       classNames={this._classNames}
                                       onClickItem={this._onMenuItemClicked} />;
    }
    protected _renderMenuContentNear() : React.ReactNode {
        const items = this.props.items;
        if(items && items.length > 0) {
            const itemViews = items.map(this._renderMenuItem);
            return (
                <div className={this._classNames.menuContentNear}>
                    {itemViews}
                </div>
            );
        }
        return null;
    }
    protected _renderMenuContentFar() : React.ReactNode {
        const items = this.props.farItems;
        if(items && items.length > 0) {
            const itemViews = items.map(this._renderMenuItem);
            return (
                <div className={this._classNames.menuContentFar}>
                    {itemViews}
                </div>
            );
        }
        return null;
    }
    private _notifyMenuOpenChange = () => {
        if(this.props.onMenuOpenChange && !this.state.menuTransition && !this.state.mainTransition) {
            this.props.onMenuOpenChange(this.state.menuOpen);
        }
    }
    private _onMenuTransitionEnd = () => {
        this.setState({ menuTransition: false }, this._notifyMenuOpenChange);
    }
    protected get hasMenu() {
        return (this.props.items && this.props.items.length > 0) || (this.props.farItems && this.props.farItems.length > 0);
    }
    protected _renderMenu() : React.ReactNode {
        if(this.hasMenu) {
            return (
                <nav role="menubar"
                    className={css(this._classNames.menu, { open: this.state.menuOpen, inline: this.props.menuInline, rootView: this.props.root })}
                    onTransitionEnd={this._onMenuTransitionEnd} aria-expanded={this.state.menuOpen && !this.state.menuTransition}>
                    <div className={this._classNames.menuGlass}></div>
                    <div className={css(this._classNames.menuContent)}>
                        {this._renderMenuControl()}
                        {this._renderMenuContentNear()}
                        {this._renderMenuContentFar()}
                    </div>
                </nav>
            );
        }
        return null;
    }
    private _onMainTransitionEnd = () => {
        this.setState({ mainTransition: false }, this._notifyMenuOpenChange);
    }
    protected _renderMain() : React.ReactNode {
        return (
            <div role="main" className={css(this._classNames.main, { menuInlineOffset: this.state.menuOpen && this.props.menuInline, hasMenu: this.hasMenu, rootView: this.props.root })}
                             onMouseDown={!this.props.menuInline ? this._onMainMouseDown : undefined}
                             onTransitionEnd={this.props.menuInline ? this._onMainTransitionEnd : undefined}>
                {this.props.children}
            </div>
        );
    }
    render() {
        this._classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={css(this._classNames.root, { menuOpen: this.state.menuOpen, rootView: this.props.root })}>
                {this._renderMenu()}
                {this._renderMain()}
            </div>
        );
    }
}

export {
    INavigationViewProps,
    INavigationViewState,
    NavigationView
};