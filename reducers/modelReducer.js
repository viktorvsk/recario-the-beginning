import * as ActionTypes from "../actions/actionTypes";

const initialState = {
    years: [],
    adsFilters: {
        gearType: "",
        fuelType: "",
        wheelsType: "",
        city: ""
    }
};

export default function modelPageReducer(state = initialState, action = {}) {
    switch (action.type) {
    case ActionTypes.GET_MODEL_SUCCESS:
        return {
            ...state,
            title: `${action.model.maker} ${action.model.model}`,
            years: action.model.results,
            currentPage: action.model.id,
            adsFilters: initialState.adsFilters,
            isLoading: false
        };
    case ActionTypes.ADS_FILTERED:
        return {
            ...state,
            adsFilters: {
                ...state.adsFilters,
                [action.filterType]: action.filterValue
            }
        };
    case ActionTypes.GET_MODEL_FAILED:
        return {
            ...state,
            isLoading: false
        };
    case ActionTypes.GET_MODEL_STARTED:
        return {
            ...state,
            isLoading: true
        };
    case ActionTypes.SET_ADS_SOURCE:
        return initialState;
    default:
        return state;
    }
}