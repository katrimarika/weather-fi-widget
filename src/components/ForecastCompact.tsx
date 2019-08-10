/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Title } from 'components/Title';
import { VerticalForecastItem } from 'components/VerticalForecastItem';
import { FC } from 'react';
import { ForecastFetchParams } from 'utils/fetcher';
import { useForecastData } from 'utils/hooks';

export const ForecastCompact: FC<{
  params: ForecastFetchParams;
  showTitle?: boolean;
}> = ({ params, showTitle }) => {
  const forecastData = useForecastData(params);

  switch (forecastData.status) {
    case 'LOADING':
      return <div>...</div>;
    case 'SUCCESS':
      const { data, title } = forecastData.data;
      if (!data.length) {
        return showTitle ? <Title title={title} /> : null;
      }
      return (
        <div>
          {showTitle && <Title title={title} />}
          <div className="flex justify-between">
            {data.slice(0, 5).map(d => (
              <VerticalForecastItem key={d.time} forecast={d} />
            ))}
          </div>
        </div>
      );
    case 'ERROR':
      return null;
    default:
      return null;
  }
};
