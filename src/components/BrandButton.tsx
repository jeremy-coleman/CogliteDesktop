import { CommandBarButton } from 'office-ui-fabric-react';
import * as React from 'react';

//@ts-ignore
import logoUrl from './Logo.png';

interface IBrandButtonProps {
    onClick?: () => void;
    //styles?: IBrandStyles;
    //className?: string;
}

//import {css} from 'glamor-jss'
import {stylesheet} from 'typestyle'

const brandStyles = stylesheet({
    root: {
        },
        logo: {
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        title: {
            color: 'white',
            zIndex: 2,
            fontSize: '14px'
        }
})

class BrandButton extends React.Component<IBrandButtonProps, any> {
    private _renderLogo() : React.ReactNode {
        return (
            <div className={brandStyles.logo} aria-hidden={true}>
                <img src={String(logoUrl)} alt="coglite" />
            </div>
        );
    }
    private _renderTitle() : React.ReactNode {
        return (
            <div className={brandStyles.title}>
                Coglite
            </div>
        )
    }
    render() {
        return (
            <CommandBarButton onClick={this.props.onClick}>
                {this._renderLogo()}
                {this._renderTitle()}
            </CommandBarButton>
        )
    }
}

export { BrandButton , IBrandButtonProps}