import { observer } from 'mobx-react';
import { DefaultButton, PrimaryButton, Rating, TextField as x } from 'office-ui-fabric-react';
import * as React from 'react';
import { stylesheet } from 'typestyle';

import Button from '@material-ui/core/Button'
import Save from '@material-ui/icons/Save'
import TextField from '@material-ui/core/TextField'

import { IListingReviewModel } from '../types';

let listingReviewStyles = stylesheet({
    root: {
            boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.4)"
        },
        editor: {
            $nest: {
                ".rating": {
                    padding: "4px 8px"
                },
                ".review": {
                    padding: "4px 8px"
                }
            }
        },
        actions: {
            padding: "4px 8px",
            $nest: {
                "button+button": {
                    marginLeft: 8
                }
            }
            }
        
})


interface IListingReviewFormProps {
    review: IListingReviewModel;
    className?: string;
    onAfterSave?: (review : IListingReviewModel) => void;
    onCancel?: () => void;
}

@observer
class ListingReviewEditor extends React.Component<IListingReviewFormProps, any> {
    private _onRatingChanged = (rating : number) => {
        this.props.review.setRate(rating);
    }
    private _onCommentsChanged = (text : string) => {
        this.props.review.setText(text);
    }
    render() {
        return (
            <div className={this.props.className} style={{overflow: 'hidden', textOverflow: 'hidden'}}>
                <div className="rating">
                    <Rating min={1} max={5} onChange={(e) => this._onRatingChanged} rating={this.props.review.rate || null} disabled={this.props.review.sync.syncing} />
                </div>
                <div className="review">
                    <TextField 
                        placeholder="Tell us what you think"
                        multiline={true}
                        fullWidth={true}
                        variant='outlined'
                        margin='dense'
                        onChange={(e) => this._onCommentsChanged}
                        disabled={this.props.review.sync.syncing}
                    />
                </div>
            </div>
        )
    }
}

@observer
class ListingReviewActions extends React.Component<IListingReviewFormProps, any> {
    private _onClickCancel = () => {
        if(this.props.onCancel) {
            this.props.onCancel();
        }
    }
    private _onClickSave = () => {
        this.props.review.save().then(() => {
            if(!this.props.review.sync.error && this.props.onAfterSave) {
                this.props.onAfterSave(this.props.review);
            }
        });
    }
    render() {
        const savedDisabled = this.props.review.sync.syncing || this.props.review.rate === null || this.props.review.rate === undefined;
        return (
            <div className={this.props.className} style={{flex: '0 0 auto', overflow: 'hidden', textOverflow: 'hidden'}}>
                <Button className="listing-review-action" onClick={this._onClickCancel} disabled={this.props.review.sync.syncing}>Cancel</Button>
                <Button className="listing-review-action" onClick={this._onClickSave} disabled={savedDisabled}><Save/>Save - Disabled-ListingRevForm</Button>
            </div>
        )
    }
}

class ListingReviewForm extends React.Component<IListingReviewFormProps, any> {
    render() {
        return (
            <div className={listingReviewStyles.root}>
                <ListingReviewEditor {...this.props} className={listingReviewStyles.editor} />
                <ListingReviewActions {...this.props} className={listingReviewStyles.actions} />
            </div>
        );
    }
}

export { IListingReviewFormProps, ListingReviewEditor, ListingReviewForm }