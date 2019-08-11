/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Centered } from 'components/Centered';
import { Copyright } from 'components/Copyright';
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
      return <Centered>...</Centered>;
    case 'SUCCESS':
      const { data, title } = forecastData.data;
      if (!data.length) {
        return (
          <div>
            {showTitle && title && <Title title={title} />}
            <div>{params.latlon ? params.latlon : params.site}?</div>
          </div>
        );
      }
      return (
        <div className="vh-100 flex flex-column justify-between">
          {showTitle && <Title title={title} />}
          <div className="flex justify-between">
            {data.slice(0, 5).map(d => (
              <VerticalForecastItem key={d.time} forecast={d} />
            ))}
          </div>
          <Copyright />
        </div>
      );
    case 'ERROR':
      return <Centered>X</Centered>;
    default:
      return null;
  }
};
