import axios from "axios";

let baseURL = "";

if (process.env.NODE_ENV === "production") {
    baseURL = "http://api.recar.io/api/v1";
} else {
    baseURL = "http://192.168.0.104:3000/api/v1";
}


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
        return apiService.get(`/models/autocomplete?q=${query}&ads_source_id=${adsSourceId}`);
    }

    static getSettings () {
        return apiService.get("/settings");
    }

    static getAds (id, year, adsSourceId) {
        let params = {"ad[model_id]": id, "ad[year]": year, ads_source_id: adsSourceId};
        return apiService.get("/ads", {params});
    }

    static getAd(id) {
        return apiService.get(`/ads/${id}`);
    }

    static signIn(phone, pass) {
        return apiService.put("/sessions", {phone_number: phone, password: pass});
    }

    static updateContacts(contacts, access_token) {
        return apiService.put("/contacts", {contacts: contacts, access_token: access_token});
    }

    static getContacts(access_token) {
        return apiService.get(`/contacts?access_token=${access_token}`);
    }
}
