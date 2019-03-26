import * as ActionTypes from "./actionTypes.js";
import API from "../services/API";
import {displayError} from "../actions/errorsActions";

export function loadAd(id) {
    return function(dispatch, getState) {
        dispatch({type: ActionTypes.GET_AD_STARTED});
        return API.getAd(id, getState().settings.accessToken)
            .then(adPayload => dispatch({type: ActionTypes.GET_AD_SUCCESS, ad: adPayload.data}))
            .catch((error) => {
                dispatch({type: ActionTypes.GET_AD_FAILED});
                dispatch(displayError(error));
            });
    };
}

export function askFriend(adId, friendId) {
    return function(dispatch, getState) {
        dispatch({type: ActionTypes.ASK_FRIEND_STARTED});

        return API.askFriend(adId, friendId, getState().settings.accessToken)
            .then(askFriendPayload => {
                if (askFriendPayload.data.message === "ok") { dispatch({type: ActionTypes.ASK_FRIEND_SUCCESS}); }
            })
            .catch((error) => {
                dispatch({type: ActionTypes.ASK_FRIEND_FAILED});
                dispatch(displayError(error));
            });
    };
}