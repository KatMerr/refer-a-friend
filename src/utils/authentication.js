import { getUserToken } from './api-calls'
import { jwtTokenName } from './consts'
import jwt_decode from 'jwt-decode'

export const loginUser = (user) => {
    return getUserToken(user)
    .then((result) => result.token)
    .then((token) => {
        localStorage.setItem(jwtTokenName, token);
    });
}

export const logoutUser = () => {
    localStorage.removeItem(jwtTokenName);
}

export const userToken = () => localStorage[jwtTokenName] || null;

export const isLoggedIn = () => {
    return !!(userToken);
}

export const userID = () => {
    let token = jwt_decode(userToken());
    return token.id || "";
}

export const userEmail = () => {
    let token = jwt_decode(userToken());
    return token.email || "";
}

export const isUserAdmin = () => {
    const token = (userToken()) ? jwt_decode(userToken()) : false;
    const isAdmin = token.admin || false;
    return isAdmin;
}