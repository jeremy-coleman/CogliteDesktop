import * as React from 'react';

import { AppFrame, IAppFrame } from './frame';
import { IAppHostBaseProps } from './IAppHostBaseProps';
import * as PathUtils from './util/PathUtils';


interface IScriptFrameProps extends IAppHostBaseProps {
    src: string;
    config?: any;
}

class ScriptFrame extends React.Component<IScriptFrameProps, any> {
    private _appFrameRef : IAppFrame;
    private _onAppFrameRef = (appFrameRef : IAppFrame) => {
        this._appFrameRef = appFrameRef;
    }
    private _onScriptLoad = () => {
        console.log("-- Script Load");
    }
    private _onScriptError = () => {
        console.log("-- Script Error");
    }
    componentDidMount() {
        const frame = this._appFrameRef.frameRef;
        const frameWindow = frame.contentWindow;
        const frameDoc = frame.contentDocument;
        const baseUrl = PathUtils.parent(this.props.src);
        frameWindow["AppConfig"] = Object.assign({}, this.props.config, {
            baseUrl: baseUrl,
            src: this.props.src,
            host: this.props.host,
        });
        const scriptEl : HTMLScriptElement = document.createElement("script");
        scriptEl.src = this.props.src;
        scriptEl.addEventListener("load", this._onScriptLoad);
        scriptEl.addEventListener("error", this._onScriptError);
        frameDoc.body.appendChild(scriptEl);
    }
    render() {
        return <AppFrame host={this.props.host} componentRef={this._onAppFrameRef} />;    
    }
}

export { IScriptFrameProps, ScriptFrame}