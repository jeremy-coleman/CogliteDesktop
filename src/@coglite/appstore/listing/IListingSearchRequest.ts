interface IListingSearchRequest {
    search?: string;
    category?: string[];
    offset?: number;
    limit?: number;
}

export { IListingSearchRequest }