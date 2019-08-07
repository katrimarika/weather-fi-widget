/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FC } from 'react';
import { useForecastData } from 'utils/hooks';

export const ForecastCompact: FC<{ site: string }> = ({ site }) => {
  const forecastData = useForecastData({ site, hourInterval: 3 });

  switch (forecastData.status) {
    case 'LOADING':
      return <div>Ladataan...</div>;
    case 'SUCCESS':
      if (!forecastData.data.length) {
        return <div>Annetulle sijainnille ei löytynyt tietoja.</div>;
      }
      const { data } = forecastData;
      return (
        <div>
          <textarea
            className="w-100"
            rows={15}
            defaultValue={JSON.stringify(data, null, 2)}
          />
        </div>
      );
    case 'ERROR':
      return <div>Virhe!</div>;
    default:
      return null;
  }
};
