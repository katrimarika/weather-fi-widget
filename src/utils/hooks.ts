import { useEffect, useRef, useState } from 'react';
import {
  Forecast,
  ForecastFetchParams,
  getForecastData,
  getObservationData,
  Observation,
  RemoteData,
} from 'utils/fetcher';

export const useForecastData = (params: ForecastFetchParams) => {
  const [forecastData, setForecastData] = useState<RemoteData<Forecast>>({
    status: 'LOADING',
  });
  const initialMount = useRef(true);

  useEffect(() => {
    if (initialMount.current) {
      getForecastData(
        params,
        data => {
          setForecastData({ status: 'SUCCESS', data });
        },
        errors => {
          setForecastData({ status: 'ERROR', errors });
        },
      );
      initialMount.current = false;
    }
  }, [params, initialMount]);

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
