import * as ActionTypes from "../actions/actionTypes";

const initialSetting = {
    fAds: [],
    fofAds: [],
    isLoading: true
};

export default function contactsRedducer(state = initialSetting, action ={}){
    switch(action.type) {
    case ActionTypes.GET_CONTACTS_SUCCESS:
        return {
            ...state,
            fAds: action.fAds,
            fofAds: action.fofAds,
            isLoading: false
        };
    default:
        return state;
    }
}
