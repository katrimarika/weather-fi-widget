const daySymbolMap = {
  1: 'Clear Day',
  2: 'Partly Cloudy Day',
  3: 'Cloudy',
  21: 'Partly Cloudy Light Rain Day',
  22: 'Partly Cloudy Moderate Rain Day',
  23: 'Partly Cloudy Heavy Rain Day',
  31: 'Light Rain',
  32: 'Moderate Rain',
  33: 'Heavy Rain',
  41: 'Partly Cloudy Light Snow',
  42: 'Partly Cloudy Moderate Snow',
  43: 'Partly Cloudy Heavy Snow',
  51: 'Light Snow',
  52: 'Moderate Snow',
  53: 'Heavy Snow',
  61: 'Isolated Thunderstorms',
  62: 'Scattered Thunderstorms',
  63: 'Thunderstorm',
  64: 'Thunderstorm',
  71: 'Partly Cloudy Light Sleet',
  72: 'Partly Cloudy Moderate Sleet',
  73: 'Partly Cloudy Heavy Sleet',
  81: 'Light Sleet',
  82: 'Moderate Sleet',
  83: 'Heavy Sleet',
  91: 'Foggy',
  92: 'Foggy',
};

export const getWeatherSymbol = (symbol3?: number): string => {
  if (!symbol3 || !(symbol3 in daySymbolMap)) return '';
  try {
    return require(`assets/weather-symbols/${
      daySymbolMap[symbol3 as keyof typeof daySymbolMap]
    }.svg`);
  } catch (e) {
    return '';
  }
};
