/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { FC } from 'react';
import { getWeatherSymbol } from 'utils/symbols';

export const WeatherSymbol: FC<{ symbol3?: number }> = ({ symbol3 }) => (
  <img
    className="flex-shrink-0"
    css={css`
      width: 2.75rem;
      height: 2.75rem;
    `}
    src={getWeatherSymbol(symbol3)}
    alt={`${symbol3 || ''}`}
    title={`${symbol3 || ''}`}
  />
);
