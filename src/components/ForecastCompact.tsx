/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FC } from 'react';
import { useForecastData } from 'utils/hooks';

export const ForecastCompact: FC<{ site: string }> = ({ site }) => {
  const forecastData = useForecastData(site);

  switch (forecastData.status) {
    case 'LOADING':
      return <div>Ladataan...</div>;
    case 'SUCCESS':
      if (!forecastData.data.length) {
        return <div>Annetulle sijainnille ei löytynyt tietoja.</div>;
      }
      const { info, data } = forecastData.data[0];
      return (
        <div>
          <h1>{info.name}</h1>
          <p>{JSON.stringify(data, null, 2)}</p>
        </div>
      );
    case 'ERROR':
      return <div>Virhe!</div>;
    default:
      return null;
  }
};
