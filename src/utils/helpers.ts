export const leading0 = (val: number) => `${val < 10 ? '0' : ''}${val}`;

export const hourStr = (time: number) => {
  const date = new Date(time);
  if (isNaN(date.getTime())) return '';
  const hours = date.getHours();
  return leading0(hours);
};

export const rounded0Str = (val: number) => `${Math.round(val)}`;
export const rounded1Str = (val: number) =>
  (Math.round(val * 10) / 10).toFixed(1).replace('.', ',');

export const temperatureStr = (temperature?: number) =>
  temperature !== undefined ? `${rounded0Str(temperature)}°` : '\u00a0';

export const rainAmountStr = (rainAmount?: number) =>
  rainAmount !== undefined ? `${rounded1Str(rainAmount)} mm` : '\u00a0';

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

export const queryStringNumber = (str?: string | string[] | null) => {
  const parsedStr = singleQueryString(str);
  if (!parsedStr) return undefined;
  const parsedNum = parseFloat(parsedStr);
  return Number.isFinite(parsedNum) ? parsedNum : undefined;
};
