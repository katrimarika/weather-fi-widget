/** @jsx jsx */
import { jsx } from '@emotion/core';
import { VerticalForecastItem } from 'components/VerticalForecastItem';
import { FC } from 'react';
import { ForecastFetchParams } from 'utils/fetcher';
import { useForecastData } from 'utils/hooks';

export const ForecastCompact: FC<{ params: ForecastFetchParams }> = ({
  params,
}) => {
  const forecastData = useForecastData(params);

  switch (forecastData.status) {
    case 'LOADING':
      return <div>...</div>;
    case 'SUCCESS':
      const { data } = forecastData;
      if (!data.length) {
        return null;
      }
      return (
        <div className="flex justify-between">
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
