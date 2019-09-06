/** @jsx jsx */
import { jsx } from '@emotion/core';
import { WeatherSymbol } from 'components/WeatherSymbol';
import { WindSymbol } from 'components/WindSymbol';
import { FC } from 'react';
import { Forecast } from 'utils/fetcher';
import { hourStr, rainAmountStr, temperatureStr } from 'utils/helpers';

export const VerticalForecastItem: FC<{ forecast: Forecast }> = ({
  forecast: { time, values },
}) => (
  <div className="flex flex-column items-center">
    <div className="f6 lh-title mb1">{hourStr(time)}</div>
    <WeatherSymbol symbol3={values.weathersymbol3} />
    <div className="f4 fw7 mv1">{temperatureStr(values.temperature)}</div>
    <WindSymbol
      windspeedms={values.windspeedms}
      winddirection={values.winddirection}
    />
    <div className="f7 mt1">{rainAmountStr(values.precipitation1h)}</div>
  </div>
);
