import * as ActionTypes from "../actions/actionTypes";
import API from "../services/API";
import {displayError} from "../actions/errorsActions";

export function loadSuggestions(value) {
    return (dispatch, getState) => {
        dispatch({type: ActionTypes.LOAD_SUGGESTIONS_BEGIN});

        API.autocompleteModels(value, getState().settings.currentAdsSourceId)
            .then(modelsPayload => dispatch({type: ActionTypes.MAYBE_UPDATE_SUGGESTIONS, suggestions: modelsPayload.data, value: value}))
            .catch((error) => {
                dispatch({type: ActionTypes.LOAD_SUGGESTIONS_FAILED});
                dispatch(displayError(error));
            });
    };
}

export function clearCurrentYear() {
    return (dispatch) => {
        dispatch({type: ActionTypes.CLEAR_CURRENT_YEAR});
    };
}
