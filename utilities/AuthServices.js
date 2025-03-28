import { AuthClient } from "./httpClient";

const Path = {
    login: "login/",
    register: "register/",
    update: "users/",  // Remove id from here
    logout: "logout/",
}

export const userLoginService = (data) => {
    return AuthClient.post(Path.login, data);
};

export const userRegisterService = (data) => {
    return AuthClient.post(Path.register, data);
}

export const userUpdateService = (userId, data) => {  // Add userId parameter
    return AuthClient.patch(`${Path.update}${userId}/`, data);
}

export const userLogoutService = () => {
    return AuthClient.delete(Path.logout);
}