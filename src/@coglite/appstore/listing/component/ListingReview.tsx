import { isWhitespace, split } from '@coglite/apphost';
import { ActivityItem, Link, Rating, TooltipHost } from 'office-ui-fabric-react';
import * as React from 'react';
import { stylesheet } from 'typestyle';

import { UserInfo } from '../../user/component/UserProfile';
import { IListingReview } from '../types';


//import { timestampIO } from "@coglite/common/MomentDataUtils";

const listingReviewStyles = stylesheet({
    root: {
            marginBottom: 12
        },
    text: {
            paddingTop: 4,
            paddingBottom: 4
        }
})

interface IListingReviewProps {
    review: IListingReview;
    className?: string;
}

const getReviewName = (activity : IListingReview) : string => {
    return activity.author ? activity.author.display_name : "";
};

const getReviewInitials = (activity : IListingReview) : string => {
    if(activity.author && activity.author.display_name) {
        const items = split(activity.author.display_name, isWhitespace);
        const letters = items.map(e => {
            return e.charAt(0).toUpperCase();
        });
        return letters.join("");
    }
    return "";
};

class ListingReviewUser extends React.Component<IListingReviewProps, any> {
    private _onRenderContent = () => {
        return <UserInfo userProfile={this.props.review.author} />;
    }
    private _onClickUser = () => {

    }
    render() {
        return (
            <TooltipHost tooltipProps={{ onRenderContent: this._onRenderContent }} calloutProps={{ gapSpace: 0 }}>
                <Link onClick={this._onClickUser}>{getReviewName(this.props.review)}</Link>
            </TooltipHost>
        );
    }
}

class ListingReview extends React.Component<IListingReviewProps, any> {
    render() {
        //const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        const review = this.props.review;
        return (
            <ActivityItem className={listingReviewStyles.root} activityDescription={
                [
                    <strong key="user"><ListingReviewUser {...this.props} /></strong>,
                    <Rating key="rating" rating={review.rate} readOnly={true} />,
                    <div key="text" className={listingReviewStyles.text}>
                        {review.text}
                    </div>
                ]
            } activityPersonas={[
                {
                    text: getReviewName(review),
                    imageInitials: getReviewInitials(review)
                }
            ]}
            timeStamp={review.edited_date || review.created_date} />
        );
    }
} 
//timeStamp={timestampIO(review.edited_date || review.created_date)} />

export { IListingReviewProps, ListingReview }