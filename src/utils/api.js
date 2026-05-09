const baseUrl = "http://localhost:3001";

const headers = { "Content-Type": "application/json" };

export const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getItems = () =>
  fetch(`${baseUrl}/items`, { headers }).then(checkResponse);

export const addItem = ({ name, imageUrl, weather }, token) =>
  fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);

export const deleteItem = (id, token) =>
  fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);

export const updateUserProfile = ({ name, avatar }, token) =>
  fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
