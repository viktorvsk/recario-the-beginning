import * as ActionTypes from "./actionTypes.js";
import API from "../services/API";
import {displayError} from "../actions/errorsActions";

export function performSearch() {

    return function(dispatch, getState) {
        dispatch({type: ActionTypes.GET_MODELS_STARTED});

        return API.search(getState().search.filters, getState().settings.currentAdsSourceId)
            .then(brandsPayload => dispatch({type: ActionTypes.GET_MODELS_SUCCESS, cars: brandsPayload.data}))
            .catch((error) => {
                dispatch({type: ActionTypes.GET_MODELS_FAILED});
                displayError(error.response);
            });
    };
}