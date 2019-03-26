import {AsyncStorage} from "react-native";

export const getAccessToken = async () => {
    try {
        return await AsyncStorage.getItem("@AsyncStore:accessToken");
    } catch (error) {
        return false;
    }
};

export const setAccessToken = async (accessToken) => {
    try {
        return await AsyncStorage.setItem("@AsyncStore:accessToken", accessToken);
    } catch (error) {
        return false;
    }
};

export const clearAccessToken = async () => {
    try {
        return await AsyncStorage.removeItem("@AsyncStore:accessToken");
    } catch (error) {
        return false;
    }
};
