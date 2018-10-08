import { ISortProps } from "./ISortProps";

interface ISortModel extends ISortProps {
    setField(field: string) : void;
    setDescending(descending: boolean) : void;
    setSort(field: string, descending?: boolean) : void;
    toggleSort(field: string) : void;
    clear() : void;
}

export { ISortModel };