import * as ActionTypes from "../actions/actionTypes";

const initialState = { currentAd: { images: [], versions: [] }, isLoading: false };

export default function adsReducer(state = initialState, action = {}) {
    state.currentYear = undefined;
    state.ads = [];
    switch (action.type) {
    // ModelPage
    case ActionTypes.GET_ADS_STARTED:
        return {
            ...state,
            isLoading: true
        };
    case ActionTypes.GET_ADS_SUCCESS:
        return {
            ...state,
            currentYear: action.year,
            ads: action.ads,
            isLoading: false
        };
    case ActionTypes.GET_ADS_FAILED:
        return {
            ...state,
            isLoading: false
        };
    case ActionTypes.SET_ADS_SOURCE:
        return initialState;
    // AdPage
    case ActionTypes.GET_AD_SUCCESS:
        return {
            ...state,
            currentAd: action.ad,
            isLoading: false
        };
    case ActionTypes.GET_AD_STARTED:
        return {
            ...state,
            isLoading: true
        };
    case ActionTypes.GET_AD_FAILED:
        return {
            ...state,
            isLoading: false
        };
    default:
        return state;
    }
}
