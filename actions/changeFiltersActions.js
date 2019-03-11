import * as ActionTypes from "./actionTypes.js";

export function changeFilters(fType, fValue) {
    const filters = { [fType]: fValue };

    return function(dispatch) {
        return dispatch({type: ActionTypes.SEARCH_FILTER_CHANGED, filters: filters});
    };
}