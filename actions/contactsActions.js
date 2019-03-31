import * as ActionTypes from "./actionTypes.js";
import API from "../services/API";
import {displayError} from "../actions/errorsActions";
import {clearAccessToken} from "../AsyncStorage";

export function updateContacts(contacts) {
    return function(dispatch, getState) {
        if (!getState().settings.accessToken) { return; }

        dispatch({type: ActionTypes.UPDATE_CONTACTS_STARTED});
        return API.updateContacts(contacts).then(payload => {
            if (payload.data.message === "ok") { dispatch({type: ActionTypes.UPDATE_CONTACTS_SUCCESS}); }
        }).catch((error) => {
            dispatch({type: ActionTypes.UPDATE_CONTACTS_FAILED});
            displayError(error.response);
            clearAccessToken();
            API.clearAccessToken();
            dispatch({type: ActionTypes.SIGN_OUT_SUCCESS});
        });
    };
}

export function getContacts() {
    return function(dispatch, getState) {
        if (!getState().settings.accessToken) { return; }

        dispatch({type: ActionTypes.GET_CONTACTS_STARTED});
        return API.getContacts().then(payload => {
            dispatch({type: ActionTypes.GET_CONTACTS_SUCCESS, fAds: payload.data.friends_ads, fofAds: payload.data.friends_of_friends_ads});
        }).catch((error) => {
            dispatch({type: ActionTypes.GET_CONTACTS_FAILED});
            displayError(error.response);
            clearAccessToken();
            API.clearAccessToken();
            dispatch({type: ActionTypes.SIGN_OUT_SUCCESS});
        });
    };
}