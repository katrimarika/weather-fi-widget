export const hourStr = (time: number) => {
  const date = new Date(time);
  if (isNaN(date.getTime())) return '';
  const hours = date.getHours();
  return `${hours < 10 ? '0' : ''}${hours}`;
};

export const temperatureStr = (temperature?: number) =>
  temperature !== undefined
    ? `${temperature > 0 ? '+' : ''}${Math.round(temperature)}°`
    : '';
