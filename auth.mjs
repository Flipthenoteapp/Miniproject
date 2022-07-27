import { TOKEN_ID } from '/enum/storage-keys.mjs';

export const getToken = () => localStorage.getItem(TOKEN_ID);

export const redirectTo = () => {
    const token = getToken();
    if (token) return;
    window.location.replace('/login.html');
};

export const redirectAway = () => {
    const token = getToken();
    if (!token) return;
    window.location.replace('/');
};

export const logout = () => {
    localStorage.removeItem(TOKEN_ID);
    redirectTo();
};
