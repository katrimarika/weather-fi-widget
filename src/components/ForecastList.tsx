/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { ForecastListItem } from 'components/ForecastListItem';
import { FC } from 'react';
import { Forecast } from 'utils/fetcher';

export const ForecastList: FC<{
  forecasts: Forecast[];
}> = ({ forecasts }) => (
  <div
    className="items-center"
    css={css`
      display: grid;
      grid-template-columns: repeat(5, auto);
      grid-gap: 0.25rem;
      justify-items: center;
    `}
  >
    {forecasts.map(f => (
      <ForecastListItem key={f.time} forecast={f} />
    ))}
  </div>
);
