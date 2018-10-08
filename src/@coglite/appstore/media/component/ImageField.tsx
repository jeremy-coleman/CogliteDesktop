import { FileField } from '@coglite/apphost';
import { Image } from 'office-ui-fabric-react';
import { getId } from 'office-ui-fabric-react';
import * as React from 'react';

import { IImage } from '../IImage';

interface IImageFieldProps {
    image?: IImage;
    label?: string;
    onChange?: (image : IImage) => void;
    onRenderImageFile?: (file : File, props : IImageFieldProps) => React.ReactNode;
    onRenderSelect?: (props : IImageFieldProps) => React.ReactNode;
    defaultSelectText?: string;
    width?: number;
    height?: number;
}

interface IImageFileProps {
    file: File;
    alt?: string;
    width?: number;
    height?: number;
}

class ImageFile extends React.Component<IImageFileProps, any> {
    private _blobUrl : string;
    private _setBlobUrl(file : File) {
        try {
            this._blobUrl = URL.createObjectURL(file);
        } catch(e) {}
    }
    private _cleanupBlobUrl() {
        if(this._blobUrl) {
            try {
                URL.revokeObjectURL(this._blobUrl);
            } catch(e) {}
            this._blobUrl = undefined;
        }
    }
    componentWillMount() {
        this._setBlobUrl(this.props.file);
    }
    componentWillUnmount() {
        this._cleanupBlobUrl();
    }
    componentWillReceiveProps(nextProps : IImageFileProps) {
        if(nextProps.file !== this.props.file) {
            this._cleanupBlobUrl();
            this._setBlobUrl(nextProps.file);
        }
    }
    render() {
        return <Image src={this._blobUrl} width={this.props.width} height={this.props.height} alt={this.props.alt || this.props.file.name} />;
    }
}

const defaultRenderImageSelect = (props : IImageFieldProps) => {
    return <Image src={props.image.url} width={props.width} height={props.height} alt={props.label} />;
};

const defaultRenderImageFile = (file : File, props : IImageFieldProps) => {
    return <ImageFile file={file} width={props.width} height={props.height} alt={props.label} />;
};

class ImageField extends React.Component<IImageFieldProps, any> {
    private _ref : HTMLInputElement;
    private _id : string;
    constructor(props : IImageFieldProps) {
        super(props);
        this.state = {};
        this._id = getId("image-field");
    }
    private _onRenderFile = (file : File) => {
        return (this.props.onRenderImageFile || defaultRenderImageFile)(file, this.props);
    }
    private _onRenderFiles = (files : File[]) => {
        if(files && files.length > 0) {
            const file = files[0];
            return this._onRenderFile(file);
        }
        return null;
    }
    private _onChange = (files : File[]) => {
        if(this.props.onChange) {
            this.props.onChange(files && files.length > 0 ? { file: files[0] } : undefined);
        }
    }
    private _onRenderSelectImage = () => {
        return (this.props.onRenderSelect || defaultRenderImageSelect)(this.props);
    }
    private _onClear = () => {
        if(this.props.onChange) {
            this.props.onChange(undefined);
        }
    }
    render() {
        return <FileField files={this.props.image && this.props.image.file ? [this.props.image.file] : undefined}
                        label={this.props.label}
                        multiple={false}
                        accept="image/*"
                        defaultSelectText={this.props.defaultSelectText || "Select an Image..."}
                        onRenderSelect={this.props.image && this.props.image.url ? this._onRenderSelectImage : undefined}
                        onRenderFiles={this._onRenderFiles}
                        onChange={this._onChange}
                        onClear={this.props.image ? this._onClear : undefined} />
    }
}

export { IImageFieldProps, IImageFileProps, ImageField, ImageFile }