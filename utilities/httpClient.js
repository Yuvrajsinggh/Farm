/* eslint-disable no-trailing-spaces */
/* eslint-disable dot-notation */
// import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// import { getData } from "./asyncStorage";

// const API_URL = "http://40.118.171.121/";
// const API_URL = "https://empire.networksecurity.space/";
// const API_URL = "http://10.10.0.34:8000/";
const API_URL = "https://major2-production.up.railway.app/api/";

// Creating Auth Instance

export const AuthClient = axios.create({
    baseURL: `${API_URL}`,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

AuthClient.interceptors.request.use(async (config) => {
    console.log(config.url);
    if (
        config.url?.includes("api/auth/logout/") ||
        config.url?.includes("api/auth/profile/")
    ) {
        const token = await AsyncStorage.getItem("access_token");
        console.log("clinet token", token);
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
    }
    return config;
});
AuthClient.interceptors.response.use(
    (res) => {
        return Promise.resolve(res.data);
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Creating HouseholdClient Instance

export const HouseholdClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

HouseholdClient.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("access_token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log("CONFIGG", config);

    return config;
});

HouseholdClient.interceptors.response.use(
    (res) => {
        return Promise.resolve(res.data); // Handling response
    },
    (error) => {
        return Promise.reject(error); // Handling errors
    }
);

// Creating HouseholdClient Instance
