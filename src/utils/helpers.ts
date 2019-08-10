export const hourStr = (time: number) => {
  const date = new Date(time);
  if (isNaN(date.getTime())) return '';
  const hours = date.getHours();
  return `${hours < 10 ? '0' : ''}${hours}`;
};

export const temperatureStr = (temperature?: number) =>
  temperature !== undefined
    ? `${temperature > 0 ? '+' : ''}${Math.round(temperature)} °`
    : '\u00a0';

export const rainAmountStr = (rainAmount?: number) =>
  rainAmount !== undefined
    ? `${(Math.round(rainAmount * 10) / 10).toFixed(1).replace('.', ',')} mm`
    : '\u00a0';

export const singleQueryString = (str?: string | string[] | null) =>
  str ? (typeof str === 'string' ? str : str[0]) : undefined;
