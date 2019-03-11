import * as ActionTypes from "./actionTypes.js";
import API from "../services/API";
import {displayError} from "../actions/errorsActions";

export function fetchSettings() {
    return function(dispatch) {
        dispatch({type: ActionTypes.GET_SETTINGS_STARTED});
        return API.getSettings()
            .then(settingsPayload => { dispatch({type: ActionTypes.GET_SETTINGS_SUCCESS, settings: settingsPayload.data}); })
            .catch((error) => {
                dispatch({type: ActionTypes.GET_SETTINGS_FAIL});
                dispatch(displayError(error));
            });
    };
}

export function setAdsSource(value) {
    return function(dispatch) {
        return dispatch({type: ActionTypes.SET_ADS_SOURCE, id: value.value});
    };
}