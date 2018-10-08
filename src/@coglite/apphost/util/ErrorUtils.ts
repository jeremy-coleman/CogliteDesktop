import { IError } from "../types";
import { joinStrings } from "./StringUtils";

const getKeyErrors = (key : string, errors : IError[]) : IError[] => {
    return errors ? errors.filter(e => e.key === key) : [];
};

const getKeyErrorMessage = (key : string, errors : IError[]) : string => {
    const es = getKeyErrors(key, errors);
    return es.length > 0 ? joinStrings(es, e => e.message) : "";
};

export { getKeyErrors, getKeyErrorMessage }