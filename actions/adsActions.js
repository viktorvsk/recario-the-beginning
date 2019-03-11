import * as ActionTypes from "./actionTypes.js";
import API from "../services/API";
import {displayError} from "../actions/errorsActions";

export function loadAd(id) {
    return function(dispatch) {
        dispatch({type: ActionTypes.GET_AD_STARTED});
        return API.getAd(id)
            .then(adPayload => dispatch({type: ActionTypes.GET_AD_SUCCESS, ad: adPayload.data}))
            .catch((error) => {
                dispatch({type: ActionTypes.GET_AD_FAILED});
                dispatch(displayError(error));
            });
    };
}