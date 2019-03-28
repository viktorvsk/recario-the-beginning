import * as ActionTypes from "./actionTypes.js";
import API from "../services/API";
import {displayError} from "../actions/errorsActions";

export function loadModel(id) {
    return function(dispatch, getState) {
        dispatch({type: ActionTypes.GET_MODEL_STARTED});
        return API.getModel(id, getState().settings.currentAdsSourceId)
            .then(modelPayload => dispatch({type: ActionTypes.GET_MODEL_SUCCESS, model: modelPayload.data}))
            .catch((error) => {
                dispatch({type: ActionTypes.GET_MODEL_FAILED});
                displayError(error.response);
            });
    };
}

export function modelFiltered(id, year) {
    return function(dispatch, getState) {
        dispatch({type: ActionTypes.GET_ADS_STARTED});
        return API.getAds(id, year, getState().settings.currentAdsSourceId)
            .then(adsPayload => dispatch({type: ActionTypes.GET_ADS_SUCCESS, ads: adsPayload.data, id: id, year: year}))
            .catch((error) => {
                dispatch({type: ActionTypes.GET_ADS_FAILED});
                displayError(error.response);
            });
    };
}

export function adsFiltered(name, value) {
    return function(dispatch) {
        dispatch({type: ActionTypes.ADS_FILTERED, filterType: name, filterValue: value});
    };
}