/** @jsx jsx */
import { jsx } from '@emotion/core';
import { VerticalForecastItem } from 'components/VerticalForecastItem';
import { FC } from 'react';
import { Forecast } from 'utils/fetcher';

export const ForecastCompact: FC<{
  forecasts: Forecast[];
}> = ({ forecasts }) => (
  <div className="flex justify-between">
    {forecasts.map(f => (
      <VerticalForecastItem key={f.time} forecast={f} />
    ))}
  </div>
);
