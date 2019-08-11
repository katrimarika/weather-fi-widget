export const hourStr = (time: number) => {
  const date = new Date(time);
  if (isNaN(date.getTime())) return '';
  const hours = date.getHours();
  return `${hours < 10 ? '0' : ''}${hours}`;
};

export const temperatureStr = (temperature?: number) =>
  temperature !== undefined ? `${Math.round(temperature)}°` : '\u00a0';

export const rainAmountStr = (rainAmount?: number) =>
  rainAmount !== undefined
    ? `${(Math.round(rainAmount * 10) / 10).toFixed(1).replace('.', ',')} mm`
    : '\u00a0';

export const singleQueryString = (str?: string | string[] | null) =>
  str ? (typeof str === 'string' ? str : str[0]) : undefined;

export const queryStringBoolean = (str?: string | string[] | null) => {
  try {
    return JSON.parse(singleQueryString(str) || 'false');
  } catch (e) {
    return false;
  }
};

export const queryStringInt = (str?: string | string[] | null) => {
  const parsedStr = singleQueryString(str);
  return (parsedStr && Math.max(parseInt(parsedStr, 10), 0)) || undefined;
};
