import { NOTES_ID } from '/enum/storage-keys.mjs';
import { getToken } from '/script/auth.mjs';
import { parse as parseError } from '/util/error.mjs';

export const updateLocalNotes = (notes) => localStorage.setItem(NOTES_ID, JSON.stringify(notes));

const sorter = (x, y) => x.title.localeCompare(y.title, undefined, { numeric: true, sensitivity: 'base' });

export const getNotes = async (cached = true) => {
    const token = getToken();
    const local = localStorage.getItem(NOTES_ID);
    if (cached && local) return JSON.parse(local).sort(sorter);
    const { data, error } = await fetch('/api/notes', { headers: { authorization: token } })
        .then((response) => response.json());
    if (data) {
        const sorted = data.sort(sorter);
        localStorage.setItem(NOTES_ID, JSON.stringify(sorted));
        return sorted;
    } else {
        alert(`Could not fetch data: ${error}`);
        return [];
    }
};

export const upsertNote = ({ body, favourite, id, title }) => fetch('/api/notes', {
    method: 'POST',
    headers: {
        authorization: getToken(),
        'content-type': 'application/json',
    },
    body: JSON.stringify({ body, favourite, id, title }),
}).then((response) => response.json()).catch(parseError);

export const deleteNote = (id) => fetch('/api/notes', {
    method: 'DELETE',
    headers: {
        authorization: getToken(),
        'content-type': 'application/json',
    },
    body: JSON.stringify({ id }),
}).then((response) => response.json()).catch(parseError);
