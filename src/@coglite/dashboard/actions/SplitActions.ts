import { action } from 'mobx';

import { HSplitModel, VSplitModel } from '../models/Split';
import { IComponent } from '../types';

const splitHorizontal = action((replace : IComponent, left : IComponent, right : IComponent) => {
    const split = new HSplitModel();
    if(replace.parent) {
        replace.parent.replace(split, replace);
    }
    split.setLeft(left);
    split.setRight(right);
});

const splitVertical = action((replace : IComponent, top : IComponent, bottom: IComponent) => {
    const split = new VSplitModel();
    if(replace.parent) {
        replace.parent.replace(split, replace);
    }
    split.setTop(top);
    split.setBottom(bottom);
});

export {
    splitHorizontal,
    splitVertical
}