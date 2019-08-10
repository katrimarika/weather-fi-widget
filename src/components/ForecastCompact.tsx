/** @jsx jsx */
import { jsx } from '@emotion/core';
import { VerticalForecastItem } from 'components/VerticalForecastItem';
import { FC } from 'react';
import { useForecastData } from 'utils/hooks';

export const ForecastCompact: FC<{ site: string }> = ({ site }) => {
  const forecastData = useForecastData({ site, hourInterval: 3 });

  switch (forecastData.status) {
    case 'LOADING':
      return <div className="pv2 ph3">...</div>;
    case 'SUCCESS':
      const { data } = forecastData;
      if (!data.length) {
        return null;
      }
      return (
        <div className="flex justify-between pa2">
          {data.slice(0, 5).map(d => (
            <VerticalForecastItem key={d.time} forecast={d} />
          ))}
        </div>
      );
    case 'ERROR':
      return null;
    default:
      return null;
  }
};
