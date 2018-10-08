interface IListingListOrgCounts {
    [key : string] : number;
}

interface IListingListCounts {
    total?: number;
    enabled?: number;
    organizations?: IListingListOrgCounts;
    [key : string] : any;
}

export { IListingListOrgCounts, IListingListCounts }