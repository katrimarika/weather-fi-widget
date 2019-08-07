import { useEffect, useState } from 'react';
import {
  Forecast,
  getForecastData,
  getObservationData,
  Observation,
  RemoteData,
} from 'utils/fetcher';

export const useForecastData = (params: {
  site?: string;
  hourInterval?: number;
}) => {
  const [forecastData, setForecastData] = useState<RemoteData<Forecast>>({
    status: 'LOADING',
  });

  useEffect(() => {
    getForecastData(
      params,
      data => {
        setForecastData({ status: 'SUCCESS', data });
      },
      errors => {
        setForecastData({ status: 'ERROR', errors });
      },
    );
  }, [params]);

  return forecastData;
};

export const useObservationData = (site: string) => {
  const [observationData, setObservationData] = useState<
    RemoteData<Observation>
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
