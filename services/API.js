import axios from "axios";

let baseURL = "";

if (process.env.NODE_ENV === "production") {
    baseURL = "https://api.recar.io/api/v1";
} else {
    baseURL = "https://api.recar.io/api/v1";
}

let cancel;

const apiService = axios.create({
    baseURL: baseURL
});

export default class API {

    static setAccessToken(accessToken) {
        apiService.defaults.headers.common["X-User-Access-Token"] = accessToken;
    }

    static clearAccessToken() {
        apiService.defaults.headers.common["X-User-Access-Token"] = null;
    }

    static search(params, adsSourceId) {
        params.ads_source_id = adsSourceId;
        return apiService.get("/models", {params});
    }

    static getModel(id, adsSourceId) {
        return apiService.get(`/models/${id}?ads_source_id=${adsSourceId}`);
    }

    static autocompleteModels(query, adsSourceId) {
        const q = query.toString().trim();
        cancel && cancel();
        return apiService.get(`/models/autocomplete?q=${q}&ads_source_id=${adsSourceId}`, { cancelToken: new axios.CancelToken(function executor(c) { cancel = c; }) });
    }

    static getSettings() {
        console.log(123)
        return apiService.get("/settings");
    }

    static getAds(id, year, adsSourceId) {
        let params = {"ad[model_id]": id, "ad[year]": year, ads_source_id: adsSourceId};
        return apiService.get("/ads", {params});
    }

    static getAd(id) {
        return apiService.get(`/ads/${id}`);
    }

    static askFriend(id, friend_id) {
        return apiService.post(`/ads/${id}/ask_friend`, {friend_id: friend_id});
    }

    static signIn(phone, code) {
        return apiService.put("/sessions", {phone_number: phone, verification_code: code});
    }

    static requestCode(phone) {
        return apiService.post("/sessions", {phone_number: phone});
    }

    static signOut() {
        return apiService.delete("/sessions");
    }

    static forgot(phone) {
        return apiService.post("/sessions", {phone_number: phone, reset: 1});
    }

    static updateContacts(contacts) {
        return apiService.put("/contacts", {contacts: contacts});
    }

    static getContacts() {
        return apiService.get("/contacts");
    }
}
