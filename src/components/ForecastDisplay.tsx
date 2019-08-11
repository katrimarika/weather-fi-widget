/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Centered } from 'components/Centered';
import { Copyright } from 'components/Copyright';
import { Title } from 'components/Title';
import { FC } from 'react';
import { Forecast, ForecastFetchParams } from 'utils/fetcher';
import { useForecastData } from 'utils/hooks';

export const ForecastDisplay: FC<{
  params: ForecastFetchParams;
  showTitle?: boolean;
  component: FC<{ forecasts: Forecast[] }>;
}> = ({ params, showTitle, component: Component }) => {
  const forecastData = useForecastData(params);

  switch (forecastData.status) {
    case 'LOADING':
      return <Centered>...</Centered>;
    case 'SUCCESS':
      const { data: forecasts, title } = forecastData.data;
      if (!forecasts.length) {
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
          <Component forecasts={forecasts} />
          <Copyright />
        </div>
      );
    case 'ERROR':
      return <Centered>X</Centered>;
    default:
      return null;
  }
};
