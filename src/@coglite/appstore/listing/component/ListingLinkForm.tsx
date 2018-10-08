import { getKeyErrorMessage } from '@coglite/apphost';
import { observer } from 'mobx-react';
import { DefaultButton, IconButton, TextField } from 'office-ui-fabric-react';
import * as React from 'react';

import { IListingLinkModel } from '../model/IListingLinkModel';
import { IListingModel } from '../model/IListingModel';
import { getClassNames, IListingLinkFormClassNames } from './ListingLinkForm.classNames';
import { getStyles, IListingLinkFormStyles } from './ListingLinkForm.styles';

interface IListingLinkEditorProps {
    listingLink: IListingLinkModel;
    className?: string;
    styles?: IListingLinkFormStyles;
    classNames?: IListingLinkFormClassNames;
}

@observer
class ListingLinkEditor extends React.Component<IListingLinkEditorProps, any> {
    private _onNameChanged = (value : string) => {
        this.props.listingLink.setName(value);
    }
    private _onUrlChanged = (value : string) => {
        this.props.listingLink.setUrl(value);
    }
    private _onClickRemove = () => {
        this.props.listingLink.removeFromListing();
    }
    render() {
        const classNames = this.props.classNames || getClassNames(getStyles(null, this.props.styles), this.props.className);
        const inputDisabled = this.props.listingLink.listing.saveSync.syncing;
        const validationErrors = this.props.listingLink.validationErrors;
        return (
            <div className={classNames.editor}>
                <div className={classNames.nameField}>
                    <TextField onChanged={this._onNameChanged}
                                value={this.props.listingLink.name || ""}
                                disabled={inputDisabled}
                                required
                                errorMessage={getKeyErrorMessage("name", validationErrors)}
                                placeholder="Name" />
                </div>
                <div className={classNames.urlField}>
                    <TextField onChanged={this._onUrlChanged} 
                                value={this.props.listingLink.url || ""}
                                disabled={inputDisabled}
                                required
                                errorMessage={getKeyErrorMessage("url", validationErrors)}
                                placeholder="URL" />
                </div>
                <div className={classNames.removeAction}>
                    <IconButton iconProps={{ iconName: "Delete" }} onClick={this._onClickRemove} title="Remove Document" />
                </div>
            </div>
        );
    }
}

interface IListingLinkFormProps {
    listing: IListingModel;
    className?: string;
    styles?: IListingLinkFormStyles;
    classNames?: IListingLinkFormClassNames;
}

@observer
class ListingLinkForm extends React.Component<IListingLinkFormProps, any> {
    private _onClickAdd = () => {
        this.props.listing.addLink();
    }
    render() {
        const classNames = this.props.classNames || getClassNames(getStyles(null, this.props.styles), this.props.className);
        const docs = this.props.listing.doc_urls;
        let content;
        if(docs && docs.length > 0) {
            const editors = docs.map((doc, idx) => {
                return <ListingLinkEditor key={idx} listingLink={doc} />;
            });
            content = (
                <div className={classNames.editors}>
                    {editors}
                </div>
            );
        }
        return (
            <div className={classNames.root}>
                {content}
                <div className={classNames.actions}>
                    <DefaultButton onClick={this._onClickAdd} iconProps={{ iconName: "Add" }}>Add Document</DefaultButton>
                </div>
            </div>
        );
    }
}

export { IListingLinkEditorProps, IListingLinkFormProps, ListingLinkEditor, ListingLinkForm }