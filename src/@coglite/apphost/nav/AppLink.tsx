import { IRequest } from '@coglite/router';
import * as React from 'react';

import { IAppHostModel } from '../types';



interface IAppLinkProps {
    host: IAppHostModel;
    request?: IRequest;
    title?: string;
    className?: string;
    onClick?: () => void;
    style?: React.CSSProperties;
    open?: boolean;
    onHostOpened?: (host : IAppHostModel) => void;
}

class AppLink extends React.Component<IAppLinkProps, undefined> {
    private _onClick = (e : React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if(this.props.onClick) {
            this.props.onClick();
        } else {
            if(this.props.open) {
                this.props.host.open(this.props.request).then(openedHost => {
                    if(this.props.onHostOpened) {
                        this.props.onHostOpened(openedHost);
                    }        
                });
            } else {
                this.props.host.load(this.props.request);
            }
        }
    }

    render() {
        const href = this.props.host.getUrl(this.props.request);
        const content = React.Children.count(this.props.children) > 0 ? this.props.children : this.props.title;
        return (
            <a style={{color: 'blue'}} className={this.props.className} title={this.props.title} href={href} onClick={this._onClick}>{content}</a>
        );
    }
}

export { IAppLinkProps, AppLink };