/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import RainIcon from 'assets/rain.svg';
import { WeatherSymbol } from 'components/WeatherSymbol';
import { WindSymbol } from 'components/WindSymbol';
import { FC, Fragment } from 'react';
import { Forecast } from 'utils/fetcher';
import { hourStr, rainAmountStr, temperatureStr } from 'utils/helpers';

export const ForecastListItem: FC<{ forecast: Forecast }> = ({
  forecast: { time, values },
}) => (
  <Fragment>
    <div
      className="fw7"
      css={css`
        justify-self: start;
      `}
    >
      {hourStr(time)}
    </div>
    <WeatherSymbol symbol3={values.weathersymbol3} />
    <div className="f4">{temperatureStr(values.temperature)}</div>
    <div>
      <WindSymbol
        windspeedms={values.windspeedms}
        winddirection={values.winddirection}
      />
    </div>
    <div
      className="flex items-center"
      css={css`
        justify-self: start;
      `}
    >
      <img
        src={RainIcon}
        alt=""
        className="flex-shrink-0 mr1"
        css={css`
          width: 0.75rem;
          height: 0.75rem;
        `}
      />
      <div className="f7">{rainAmountStr(values.precipitation1h)}</div>
    </div>
  </Fragment>
);
