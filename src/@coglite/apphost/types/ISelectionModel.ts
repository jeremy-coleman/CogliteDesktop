
interface ISelectionModel<T> {
    selectedItems: T[];
    selectionCount: number;
    setSelectedItems(selectedItems: T[]);
    toggleItem(item : T, selected?: boolean) : void;
    clearSelection();
}

export { ISelectionModel as default, ISelectionModel };