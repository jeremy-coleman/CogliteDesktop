import * as React from 'react';

export const CIRCLE_ID_PREFIX = 'circle-';

export interface CircleProps {
    id: string
    strokeColorSelected?: string
    strokeColorHovered?: string
    selected?: boolean
    hovered?: boolean
    x: any
    y: any
    r: any
    color: any
};

export default class Circle extends React.Component<CircleProps, any> {
    static defaultProps = {
    strokeColorSelected: 'white',
    strokeColorHovered: 'white',
    selected: false,
    hovered: false
    }
    
    render() {
        var isHovered = this.props.hovered,
            shouldShowLine = isHovered || this.props.selected,
            config = {
                cx: this.props.x,
                cy: this.props.y,
                r: this.props.r,
                fill: this.props.color,
                strokeWidth: shouldShowLine ? 5 : 0,
                stroke: isHovered ? this.props.strokeColorHovered : this.props.strokeColorSelected
            };

        return (
            <circle {...config}
                id={this.props.id} />
        );
    }
}


