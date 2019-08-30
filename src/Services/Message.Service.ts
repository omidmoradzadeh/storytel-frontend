import { api } from "../config";
import { getToken } from "../Services/Authentication.Service";

export interface IMessage {
    id?: number,
    text?: string,
    createDate ?: string
}

export function getMessages(page: number = 1): Promise<IMessage[]> {
    return fetch(`${api}/Message`, { method: "GET", headers: { Authorization: `Bearer ${getToken()}` } })
        .then((res) => res.json().then((body) => ({ status: res.status, body })))
        .then(({ status, body }) => status !== 200 ? Promise.reject({ status, body }) : body.data)
}

export function addMessage(text: string): Promise<IMessage> {
    return fetch(`${api}/Message`, { method: "POST", body: JSON.stringify({ text }), headers: { Authorization: `Bearer ${getToken()}`, "Content-Type": "application/json" } })
        .then((res) => res.json().then((body) => ({ status: res.status, body })))
        .then(({ status, body }) => status !== 201 ? Promise.reject({ status, body }) : body)
}

export function editMessage({ id, text }: IMessage): Promise<number> {
    return fetch(`${api}/Message/${id}`, { method: "PUT", body: JSON.stringify({ text }), headers: { Authorization: `Bearer ${getToken()}`, "Content-Type": "application/json" } })
        .then(({ status }) => status !== 204 ? Promise.reject({ status }) : Promise.resolve(status))
}

export function deleteMessage(id: number): Promise<number> {
    return fetch(`${api}/Message/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${getToken()}` } })
        .then(({ status }) => status !== 204 ? Promise.reject({ status }) : Promise.resolve(status))
}