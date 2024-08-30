export const getOhlc = (items) => items.map((i) => i.slice(0, 5));
export const getVolume = (items) => items.map((i) => [i[0], i[5]]);
