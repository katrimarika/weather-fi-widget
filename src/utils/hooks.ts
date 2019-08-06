import { useEffect, useState } from 'react';
import {
  ForecastPropertyKey,
  getForecastData,
  getObservationData,
  ObservationPropertyKey,
  RemoteData,
} from 'utils/fetcher';

export const useForecastData = (site: string) => {
  const [forecastData, setForecastData] = useState<
    RemoteData<ForecastPropertyKey>
  >({
    status: 'LOADING',
  });

  useEffect(() => {
    getForecastData(
      site,
      data => {
        setForecastData({ status: 'SUCCESS', data });
      },
      errors => {
        setForecastData({ status: 'ERROR', errors });
      },
    );
  }, [site]);

  return forecastData;
};

export const useObservationData = (site: string) => {
  const [observationData, setObservationData] = useState<
    RemoteData<ObservationPropertyKey>
  >({
    status: 'LOADING',
  });

  useEffect(() => {
    getObservationData(
      site,
      data => {
        setObservationData({ status: 'SUCCESS', data });
      },
      errors => {
        setObservationData({ status: 'ERROR', errors });
      },
    );
  }, [site]);

  return observationData;
};
