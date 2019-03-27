import axios from "axios";

let baseURL = "";

if (process.env.NODE_ENV === "production") {
    baseURL = "http://api.recar.io/api/v1";
} else {
    baseURL = "http://192.168.0.102:3000/api/v1";
}

let cancel;

const apiService = axios.create({
    baseURL: baseURL
});

export default class API {

    static search (params, adsSourceId) {
        params.ads_source_id = adsSourceId;
        return apiService.get("/models", {params});
    }

    static getModel (id, adsSourceId) {
        return apiService.get(`/models/${id}?ads_source_id=${adsSourceId}`);
    }

    static autocompleteModels (query, adsSourceId) {
        cancel && cancel();
        return apiService.get(`/models/autocomplete?q=${query}&ads_source_id=${adsSourceId}`, { cancelToken: new axios.CancelToken(function executor(c) { cancel = c; }) });
    }

    static getSettings () {
        return apiService.get("/settings");
    }

    static getAds (id, year, adsSourceId) {
        let params = {"ad[model_id]": id, "ad[year]": year, ads_source_id: adsSourceId};
        return apiService.get("/ads", {params});
    }

    static getAd(id, token) {
        return apiService.get(`/ads/${id}?access_token=${token}`);
    }

    static askFriend(id, friend_id, token) {
        return apiService.post(`/ads/${id}/ask_friend`, {access_token: token, friend_id: friend_id});
    }

    static signIn(phone, code) {
        return apiService.put("/sessions", {phone_number: phone, verification_code: code});
    }

    static requestCode(phone) {
        return apiService.post("/sessions", {phone_number: phone});
    }

    static signOut(access_token) {
        return apiService.delete("/sessions", {access_token: access_token});
    }

    static forgot(phone) {
        return apiService.post("/sessions", {phone_number: phone, reset: 1});
    }

    static updateContacts(contacts, access_token) {
        return apiService.put("/contacts", {contacts: contacts, access_token: access_token});
    }

    static getContacts(access_token) {
        return apiService.get(`/contacts?access_token=${access_token}`);
    }
}
