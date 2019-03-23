import {combineReducers} from "redux";
import settingsReducer from "./settingsReducer";
import adsReducer from "./adsReducer";
import modelReducer from "./modelReducer";
import autocompleteReducer from "./autocompleteReducer";
import searchReducer from "./searchReducer";
import contactsReducer from "./contactsReducer";
import errorReducer from "./errorReducer";

const rootReducer = combineReducers({
    settings: settingsReducer,
    search: searchReducer,
    autocomplete: autocompleteReducer,
    model: modelReducer,
    ads: adsReducer,
    contacts: contactsReducer,
    error: errorReducer
});

export default rootReducer;
