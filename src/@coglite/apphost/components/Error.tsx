import Tooltip from '@material-ui/core/Tooltip';
import ErrorIcon from '@material-ui/icons/Error';
import * as React from 'react';
import styled from 'styled-jss';
import { withTheme } from 'theming';
import { stylesheet } from 'typestyle';

import { theme } from '../theme';
import { isObject, isString } from '../util/LangUtils';


const ErrorMsg = styled('div')({
    fontSize: '12px',
    backgroundColor: 'red',
    color: 'white',
    padding: "4px 8px"
})

const ErrorItemStyle = styled('div')({
    margin: 8,
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: theme.palette.primary.main,
})

const ErrorItemTitle = withTheme(styled('div')(({theme}) => ({
    fontSize: '12px',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    padding: "4px 8px"
})))

const ErrorItemValue = styled('div')({
    fontSize: '12px',
    padding: 8,
    overflow: "auto"
})

const errorStyles = theme =>  stylesheet({
        root: {},
        compact: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        message: {
            fontSize: theme.fonts.medium.fontSize,
            backgroundColor: theme.palette.redDark,
            color: theme.palette.white,
            padding: "4px 8px"
        },
        item: {
            margin: 8,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: theme.palette.redDark
        },
        itemTitle: {
            fontSize: theme.fonts.small.fontSize,
            backgroundColor: theme.palette.redDark,
            color: theme.palette.white,
            padding: "4px 8px"
        },
        itemValue: {
            fontSize: theme.fonts.small.fontSize,
            padding: 8,
            overflow: "auto"
        }
});


interface IErrorItemProps {
    title: string;
    className?: any;
    children?: React.ReactNode
}

export function ErrorItem (props: IErrorItemProps ) {
        return (
            <ErrorItemStyle>
                <ErrorItemTitle>{props.title}</ErrorItemTitle>
                <ErrorItemValue>
                    {props.children}
                </ErrorItemValue>
            </ErrorItemStyle>
        )
    }


interface IErrorProps {
    error?: any;
    className?: any;
}

class ErrorMessage extends React.Component<IErrorProps, any> {
    render() {
        const error = this.props.error;
        if(error) {
            const message = isString(error) ? error : error && error.message ? error.message : "An error has occurred";
            return <ErrorMsg key="message">{message}</ErrorMsg>;
        }
        return null;
    }
}

class ErrorStack extends React.Component<IErrorProps, any> {
    render() {
        const error = this.props.error;
        if(error) {
            let stack = error ? error.stack : null;
            if(stack) {
                return <ErrorItem className="stack-item" title="Stack"><pre>{stack}</pre></ErrorItem>
            }
        }
        return null;
    }
}

class ErrorDetail extends React.Component<IErrorProps, any> {
    render() {
        const error = this.props.error;
        if(error) {
            let r : React.ReactNode[] = [];
            if(isObject(error)) {
                Object.keys(error).forEach((key) => {
                    if(key !== "message" && key !== "stack") {
                        const value = error[key];
                        if(value) {
                            let valueContent;
                            if(isObject(value)) {
                                try {
                                    valueContent = <pre>{JSON.stringify(value, null, "\t")}</pre>;
                                } catch(err) {}
                            } else {
                                valueContent = String(value);
                            }

                            if(valueContent) {
                                r.push(
                                    <ErrorItem key={key} title={key}><pre>{valueContent}</pre></ErrorItem>
                                );
                            }
                        }
                    }
                });
            }
            return r;
        }
        return null;
    }
}

class Error extends React.Component<IErrorProps, any> {
    render() {
        if(this.props.error) {
            return (
                <div role="error">
                    <ErrorMessage {...this.props} />
                    <ErrorStack {...this.props} />
                    <ErrorDetail {...this.props} />
                </div>
            );
        }
        return null;
    }
}


class CompactError extends React.Component<IErrorProps, any> {
    private _onRenderTooltipContent = () => {
        return <Error error={this.props.error} />;
    };
    render() {
        if(this.props.error) {
            return (
                <div style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
                    <Tooltip title={'Error' } PopperProps={{ onRenderContent: this._onRenderTooltipContent }}>
                        <ErrorIcon/>
                    </Tooltip>
                </div>
            );
        }
        return null;
    }
}

export { IErrorProps, Error, CompactError };