import {notification} from "../Utils";

export function displayError(error) {
    if (!error || !error.data) { return; }
    const message = error.data.message ? error.data.message : error.data;
    notification.ref.show({message: message});
}