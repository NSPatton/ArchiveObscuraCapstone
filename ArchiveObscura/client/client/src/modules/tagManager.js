import { getToken } from "./authManager";
const baseUrl = '/api/tag'

export const getAllTags = () => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("an unknown error occurred while trying to get all tags")
            }
        });
    });
};

export const getTagById = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json());
    });
};
