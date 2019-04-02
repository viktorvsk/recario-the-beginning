import * as ActionTypes from "../actions/actionTypes";

const initialState = {
    filters: {
        fuel_types: [],
        wheels_types: [],
        carcass_types: [],
        gear_types: []
    },
    model_images: {},
    isLoading: true,
    adsSources: [{ title: "", id: 1, selected: true}],
    accessToken: undefined,
    sessionModalVisible: false,
    isSignOutLoading: false,
    sessionError: {},
    initializeFailed: false
};

export default function settingsReducer(state = initialState, action = {}) {
    switch (action.type) {
    case ActionTypes.GET_SETTINGS_STARTED:
        return {
            ...state,
            isLoading: true
        };
    case ActionTypes.GET_SETTINGS_SUCCESS:
        return {
            ...state,
            filters: action.settings.filters,
            model_images: action.settings.model_images,
            adsSources: action.settings.sources,
            currentAdsSourceId: action.settings.sources.filter(source => source.selected)[0].id,
            isLoading: false
        };
    case ActionTypes.GET_SETTINGS_FAIL:
        return {
            ...state,
            isLoading: false,
            initializeFailed: true
        };
    case ActionTypes.SET_ADS_SOURCE:
        return {
            ...state,
            currentAdsSourceId: action.id,
            adsSources: state.adsSources.map(source => {
                return {
                    ...source,
                    selected: parseInt(source.id) === parseInt(action.id)
                };
            })

        };
    case ActionTypes.SIGN_IN_FAILED:
        return {
            ...state,
            sessionModalVisible: false
        };
    case ActionTypes.REQUEST_CODE_FAILED:
        return {
            ...state,
            sessionModalVisible: false
        };
    case ActionTypes.SIGN_IN_SUCCESS:
        return {
            ...state,
            accessToken: action.token
        };
    case ActionTypes.SIGN_OUT_STARTED:
        return {
            ...state,
            isSignOutLoading: true
        };
    case ActionTypes.SIGN_OUT_SUCCESS:
        return {
            ...state,
            accessToken: undefined,
            sessionModalVisible: false,
            isSignOutLoading: false
        };
    case ActionTypes.SIGN_OUT_FAILED:
        return {
            ...state,
            isSignOutLoading: false
        };
    case ActionTypes.SHOW_SESSION_MODAL:
        return {
            ...state,
            sessionModalVisible: true
        };
    case ActionTypes.HIDE_SESSION_MODAL:
        return {
            ...state,
            sessionModalVisible: false
        };
    default:
        return state;
    }
}