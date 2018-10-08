import { IUserProfile } from "../user/IUserProfile";

interface IListingReview {
    id?: number;
    author?: IUserProfile;
    listing?: number;
    rate?: number;
    text?: string;
    edited_date?: string;
    created_date?: string;
    review_parent?: number;
    review_response?: IListingReview[];
}

export { IListingReview }