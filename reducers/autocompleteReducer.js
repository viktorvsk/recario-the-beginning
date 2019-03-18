import * as ActionTypes from "../actions/actionTypes";

const autocompleteInitialState = {
    value: "",
    suggestions: [],
    isLoading: false
};

export default function autocompleteReducer(state = autocompleteInitialState, action = {}) {
    switch (action.type) {
    case ActionTypes.UPDATE_INPUT_VALUE:
        return {
            ...state,
            value: action.value
        };

    case ActionTypes.CLEAR_SUGGESTIONS:
        return {
            ...state,
            suggestions: []
        };

    case ActionTypes.LOAD_SUGGESTIONS_BEGIN:
        return {
            ...state,
            isLoading: true
        };

    case ActionTypes.MAYBE_UPDATE_SUGGESTIONS:

        return {
            ...state,
            suggestions: action.suggestions,
            value: action.value,
            isLoading: false
        };
    case ActionTypes.LOAD_SUGGESTIONS_FAILED:
        return {
            ...state,
            isLoading: false
        };

    default:
        return state;
    }
}
