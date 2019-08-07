/** @jsx jsx */
import { jsx } from '@emotion/core';
import { WindSymbol } from 'components/WindSymbol';
import { FC } from 'react';
import { Forecast } from 'utils/fetcher';
import { hourStr, temperatureStr } from 'utils/helpers';

export const VerticalForecastItem: FC<{ forecast: Forecast }> = ({
  forecast: { time, values },
}) => (
  <div className="flex flex-column items-center">
    <div className="fw7">{hourStr(time)}</div>

    <div className="f4">{temperatureStr(values.temperature)}</div>
    <WindSymbol
      windspeedms={values.windspeedms}
      winddirection={values.winddirection}
    />
  </div>
);
