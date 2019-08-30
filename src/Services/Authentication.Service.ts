import { api } from "../config";

export interface IUser {
    id?: number,
    UserName: string,
    Name: string,
    Family: string,
    Email: string,
    Password?: string,
}

export function login(userName: string, password: string) {
    return fetch(`${api}/JWTAuthentication`, { method: "POST", body: JSON.stringify({ userName, password }), headers: { "Content-Type": "application/json" } })
        .then((res) => res.json().then((body) => ({ status: res.status, body })))
        .then(({ status, body }) => status !== 200 ? Promise.reject(body) : body.data.token)
        .then((token) => {
            sessionStorage.setItem("token", token);
            return token;
        })
}

export function getToken() {
    return sessionStorage.getItem("token");
}