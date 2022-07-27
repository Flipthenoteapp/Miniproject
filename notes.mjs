import { NOTES_ID } from '/enum/storage-keys.mjs';
import { getToken } from '/script/auth.mjs';
import { parse as parseError } from '/util/error.mjs';

export const updateLocalNotes = (notes) => localStorage.setItem(NOTES_ID, JSON.stringify(notes));

export const getNotes = async (cached = true) => {
    const token = getToken();
    const local = localStorage.getItem(NOTES_ID);
    if (cached && local) return JSON.parse(local);
    const { data, error } = await fetch('/api/notes', { headers: { authorization: token } })
        .then((response) => response.json());
    if (data) {
        localStorage.setItem(NOTES_ID, JSON.stringify(data));
        return data;
    } else {
        alert(`Could not fetch data: ${error}`);
        return [];
    }
};

export const upsertNote = ({ body, id, title }) => fetch('/api/notes', {
    method: 'POST',
    headers: {
        authorization: getToken(),
        'content-type': 'application/json',
    },
    body: JSON.stringify({ body, id, title }),
}).then((response) => response.json()).catch(parseError);

export const deleteNote = (id) => fetch('/api/notes', {
    method: 'DELETE',
    headers: {
        authorization: getToken(),
        'content-type': 'application/json',
    },
    body: JSON.stringify({ id }),
}).then((response) => response.json()).catch(parseError);
