import * as ActionTypes from "./actionTypes.js";
import API from "../services/API";
import {displayError} from "../actions/errorsActions";

export function signIn(phone, pass, callback) {
    return function(dispatch) {
        dispatch({type: ActionTypes.SIGN_IN_STARTED});

        return API.signIn(phone, pass)
            .then(signInPayload => {
                dispatch({type: ActionTypes.SIGN_IN_SUCCESS, token: signInPayload.data.access_token});
                callback();
            })
            .catch((error) => {
                dispatch({type: ActionTypes.SIGN_IN_FAILED});
                dispatch(displayError(error));
            });
    };
}