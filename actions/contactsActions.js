import * as ActionTypes from "./actionTypes.js";
import API from "../services/API";
import {displayError} from "../actions/errorsActions";

export function updateContacts(contacts) {
    return function(dispatch, getState) {
        dispatch({type: ActionTypes.UPDATE_CONTACTS_STARTED});
        return API.updateContacts(contacts, getState().settings.accessToken).then(payload => {
            if (payload.data.message === "ok") { dispatch({type: ActionTypes.UPDATE_CONTACTS_SUCCESS}); }
        }).catch((error) => {
            dispatch({type: ActionTypes.UPDATE_CONTACTS_FAILED});
            dispatch(displayError(error));
        });
    };
}

export function getContacts() {
    return function(dispatch, getState) {
        dispatch({type: ActionTypes.GET_CONTACTS_STARTED});
        return API.getContacts(getState().settings.accessToken).then(payload => {
            dispatch({type: ActionTypes.GET_CONTACTS_SUCCESS, fAds: payload.data.friends_ads, fofAds: payload.data.friends_of_friends_ads});
        }).catch((error) => {
            dispatch({type: ActionTypes.GET_CONTACTS_FAILED});
            dispatch(displayError(error));
        });
    };
}