import * as ActionTypes from "../actions/actionTypes";

const initialState = {
    isLoading: false,
    cars: [],
    filters: {
        "q[price_min]": 5000,
        "q[price_max]": 10000,
        "q[year_min]": 2000,
        "q[year_max]": 2010,
        "q[race_min]": 0,
        "q[race_max]": 200,
        "q[ads_count]": 5,
        "q[gear_type_id]": "",
        "q[fuel_type_id]": "",
        "q[wheels_type_id]": "",
        "q[carcass_type_id]": ""
    }
};

export default function searchReducer(state = initialState, action = {}) {

    switch(action.type) {
    case ActionTypes.GET_MODELS_SUCCESS:
        return {
            ...state,
            cars: action.cars,
            isLoading: false
        };
    case ActionTypes.GET_MODELS_STARTED:
        return {
            ...state,
            isLoading: true
        };
    case ActionTypes.GET_MODELS_FAILED:
        return {
            ...state,
            cars: [],
            isLoading: false
        };
    case ActionTypes.SEARCH_FILTER_CHANGED:
        return {
            ...state,
            filters: {
                ...state.filters,
                ...action.filters
            }
        };
    case ActionTypes.SET_ADS_SOURCE:
        return initialState;
    default:
        return state;
    }
}
