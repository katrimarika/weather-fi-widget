/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { WindSymbol } from 'components/WindSymbol';
import { FC } from 'react';
import { Forecast } from 'utils/fetcher';
import { hourStr, rainAmountStr, temperatureStr } from 'utils/helpers';
import { getWeatherSymbol } from 'utils/symbols';

export const VerticalForecastItem: FC<{ forecast: Forecast }> = ({
  forecast: { time, values },
}) => (
  <div className="flex flex-column items-center">
    <div className="fw7 mb1">{hourStr(time)}</div>
    <img
      className="flex-shrink-0 mb1"
      css={css`
        width: 2.75rem;
        height: 2.75rem;
      `}
      src={getWeatherSymbol(values.weathersymbol3)}
      alt=""
    />
    <div className="f4 mb1">{temperatureStr(values.temperature)}</div>
    <WindSymbol
      windspeedms={values.windspeedms}
      winddirection={values.winddirection}
    />
    <div className="f7 mt1">{rainAmountStr(values.precipitationAmount)}</div>
  </div>
);
