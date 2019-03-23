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
    accessToken: "LEzisJKD15dCtW1F21uP"
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
            isLoading: false
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
    case ActionTypes.SIGN_IN_SUCCESS:
        return {
            ...state,
            accessToken: action.token
        };
    default:
        return state;
    }
}