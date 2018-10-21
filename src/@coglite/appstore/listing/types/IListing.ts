import { IImage, IScreenShot } from '../../media/types';
import { ITag } from '../../tag/ITag';
import { IUserProfile } from '../../user/types/IUserProfile';
import { ListingApprovalStatus } from '../constants/ListingApprovalStatus';
import { ICategory } from './ICategory';
import { IListingLink } from './IListingLink';

interface IListing {
    id?: number;
    unique_name?: string;
    title?: string;
    description?: string;
    description_short?: string;
    is_enabled?: boolean;
    is_featured?: boolean;
    is_private?: boolean;
    launch_url?: string;
    security_marking?: string;
    owners?: IUserProfile[];
    categories?: ICategory[];
    tags?: ITag[];
    version_name?: string;
    small_icon?: IImage;
    large_icon?: IImage;
    banner_icon?: IImage;
    large_banner_icon?: IImage;
    approval_status?: ListingApprovalStatus;
    requirements?: string;
    what_is_new?: string;
    screenshots?: IScreenShot[];
    is_bookmarked?: boolean;
    is_deleted?: boolean;
    avg_rate?: number;
    total_votes?: number;
    total_rate5?: number,
    total_rate4?: number;
    total_rate3?: number;
    total_rate2?: number;
    total_rate1?: number;
    total_reviews?: number;
    total_review_responses?: number;
    feedback_score?: number;
    doc_urls?: IListingLink[];
    iframe_compatible?: boolean;
}

export { IListing }