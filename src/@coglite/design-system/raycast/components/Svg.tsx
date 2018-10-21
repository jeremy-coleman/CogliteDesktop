import * as React from 'react';

export default class Svg extends React.Component<any, any> {
    render() {
        return (
            <svg x={this.props.top} width={this.props.width} height={this.props.height}>
                {this.props.children}
            </svg>
        );
    }
}