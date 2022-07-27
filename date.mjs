import months from '/enum/months.mjs';

export const format = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
};
