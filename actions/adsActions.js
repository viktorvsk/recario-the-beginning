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
                displayError(error.response);
            });
    };
}

export function askFriend(adId, friendId) {
    return function(dispatch) {
        dispatch({type: ActionTypes.ASK_FRIEND_STARTED});

        return API.askFriend(adId, friendId)
            .then(askFriendPayload => {
                if (askFriendPayload.data.message === "ok") { dispatch({type: ActionTypes.ASK_FRIEND_SUCCESS}); }
            })
            .catch((error) => {
                dispatch({type: ActionTypes.ASK_FRIEND_FAILED});
                displayError(error.response);
            });
    };
}