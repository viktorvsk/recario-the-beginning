import * as ActionTypes from "../actions/actionTypes";

const initialSetting = {
    fAds: [],
    fofAds: [],
    isLoading: true,
    permissionsGiven: true
};

export default function contactsRedducer(state = initialSetting, action ={}){
    switch(action.type) {
    case ActionTypes.GET_CONTACTS_STARTED:
        return {
            ...state,
            isLoading: true
        };
    case ActionTypes.GET_CONTACTS_SUCCESS:
        return {
            ...state,
            fAds: action.fAds,
            fofAds: action.fofAds,
            isLoading: false
        };
    case ActionTypes.GET_CONTACTS_FAILED:
        return {
            ...state,
            isLoading: false,
            fAds: [],
            fofAds: []
        };
    case ActionTypes.UPDATE_CONTACTS_SUCCESS:
        return {
            ...state,
            permissionsGiven: true
        };
    case ActionTypes.UPDATE_CONTACTS_STARTED:
        return {
            ...state,
            fAds: [],
            fofAds: []
        };
    case ActionTypes.UPDATE_CONTACTS_FAILED:
        return {
            ...state,
            fAds: [],
            fofAds: []
        };
    case ActionTypes.CONTACTS_PERMISSIONS_DENIED:
        return {
            ...state,
            permissionsGiven: false
        };
    default:
        return state;
    }
}
