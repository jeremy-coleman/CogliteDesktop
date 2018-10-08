import { IListing } from "./IListing";

interface IListingStoreFront {
    featured?: IListing[];
    most_popular?: IListing[];
    recent?: IListing[];
    recommended?: IListing[];
}

export { IListingStoreFront }