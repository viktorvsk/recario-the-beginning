import * as ActionTypes from "./actionTypes.js";
import API from "../services/API";
import {displayError} from "../actions/errorsActions";
import {setAccessToken, clearAccessToken} from "../AsyncStorage";

export function signIn(phone, code) {
    return function(dispatch) {
        dispatch({type: ActionTypes.SIGN_IN_STARTED});

        return API.signIn(phone, code)
            .then(signInPayload => {
                const token = signInPayload.data.access_token;
                setAccessToken(token);
                API.setAccessToken(token);
                dispatch({type: ActionTypes.SIGN_IN_SUCCESS, token: token});
            })
            .catch((error) => {
                dispatch({type: ActionTypes.SIGN_IN_FAILED});
                displayError(error.response);
            });
    };
}

export function requestCode(phone) {
    return function(dispatch) {
        dispatch({type: ActionTypes.REQUEST_CODE_STARTED});

        return API.requestCode(phone)
            .then(requestCodePayload => {
                if (requestCodePayload.data.message === "ok") { dispatch({type: ActionTypes.REQUEST_CODE_SUCCESS}); }
            })
            .catch((error) => {
                dispatch({type: ActionTypes.REQUEST_CODE_FAILED});
                displayError(error.response);
            });
    };
}

export function signOut() {
    return function(dispatch) {
        dispatch({type: ActionTypes.SIGN_OUT_STARTED});

        return API.signOut()
            .then(signOutPayload => {
                if (signOutPayload.data.message === "ok") {
                    dispatch({type: ActionTypes.SIGN_OUT_SUCCESS});
                    clearAccessToken();
                    API.clearAccessToken();
                }
            })
            .catch((error) => {
                dispatch({type: ActionTypes.SIGN_OUT_FAILED});
                displayError(error.response);
            });
    };
}

export function showModal() {
    return function(dispatch) {
        dispatch({type: ActionTypes.SHOW_SESSION_MODAL});
    };
}
export function hideModal() {
    return function(dispatch) {
        dispatch({type: ActionTypes.HIDE_SESSION_MODAL});
    };
}