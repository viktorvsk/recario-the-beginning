import * as ActionTypes from "../actions/actionTypes";

export function displayError(error) {
    return {type: ActionTypes.SET_ERROR, error: error};
}