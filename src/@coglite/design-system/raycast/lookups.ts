
/**Checks whether the element ID is equal to ID*/
export function equalID(id, element) {
    return id === element.id;
}

const BLANK_STRING = ' ';

/**Checks whether the substring is present within element className*/
export function evaluateClassName(sub, element) {
    var className = BLANK_STRING + element.className + BLANK_STRING;

    sub = BLANK_STRING + sub + BLANK_STRING;
    return className && className.indexOf(sub) > -1;
}

/**Checks whether the substring is present within element ID*/
export function evaluateID(sub, element) {
    var id = element.id;

    return id && id.indexOf(sub) === 0;
}


/**Checks whether the substring is present within element's React ID*/
export function evaluateReactID(sub, element) {
    var id = element.getAttribute && element.getAttribute('data-reactid');

    return id && id.indexOf(sub) > -1;
}