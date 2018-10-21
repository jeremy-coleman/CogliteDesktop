import { IPreferencesModel, PreferencesModel } from './PreferencesModel';

interface IViewPreferencesModel extends IPreferencesModel {
    isFieldVisible(fieldKey: string): boolean;
    setFieldVisible(fieldKey: string, visible: boolean): void;
}

class ViewPreferencesModel extends PreferencesModel implements IViewPreferencesModel {

    isFieldVisible(fieldKey: string): boolean {
        let key = `${fieldKey}.hidden`;
        let hidden = this.get(key) || false;
        return !hidden;
    }

    setFieldVisible(fieldKey: string, visible: boolean): void {
        let key = `${fieldKey}.hidden`;
        if (visible) {
            this.delete(key);
        } else {
            this.set(key, true);
        }
    }
}

export { ViewPreferencesModel as default, ViewPreferencesModel, IViewPreferencesModel }